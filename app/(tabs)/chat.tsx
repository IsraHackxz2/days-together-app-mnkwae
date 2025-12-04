
import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Pressable, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: number;
}

interface Friend {
  code: string;
  name: string;
}

export default function ChatScreen() {
  const { t } = useLanguage();
  const [myCode, setMyCode] = useState<string>("");
  const [myName, setMyName] = useState<string>("");
  const [friendCode, setFriendCode] = useState<string>("");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const [showAddFriend, setShowAddFriend] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    initializeUser();
    loadFriends();
  }, []);

  useEffect(() => {
    if (selectedFriend) {
      loadMessages(selectedFriend.code);
    }
  }, [selectedFriend]);

  const initializeUser = async () => {
    try {
      let code = await AsyncStorage.getItem('userCode');
      let name = await AsyncStorage.getItem('userName');
      
      if (!code) {
        // Generate a unique 6-digit code
        code = Math.floor(100000 + Math.random() * 900000).toString();
        await AsyncStorage.setItem('userCode', code);
      }
      
      if (!name) {
        name = "User";
        await AsyncStorage.setItem('userName', name);
      }
      
      setMyCode(code);
      setMyName(name);
    } catch (error) {
      console.log('Error initializing user:', error);
    }
  };

  const loadFriends = async () => {
    try {
      const savedFriends = await AsyncStorage.getItem('friends');
      if (savedFriends) {
        setFriends(JSON.parse(savedFriends));
      }
    } catch (error) {
      console.log('Error loading friends:', error);
    }
  };

  const saveFriends = async (newFriends: Friend[]) => {
    try {
      await AsyncStorage.setItem('friends', JSON.stringify(newFriends));
    } catch (error) {
      console.log('Error saving friends:', error);
    }
  };

  const loadMessages = async (friendCode: string) => {
    try {
      const key = `messages_${myCode}_${friendCode}`;
      const savedMessages = await AsyncStorage.getItem(key);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.log('Error loading messages:', error);
    }
  };

  const saveMessages = async (friendCode: string, newMessages: Message[]) => {
    try {
      const key = `messages_${myCode}_${friendCode}`;
      await AsyncStorage.setItem(key, JSON.stringify(newMessages));
    } catch (error) {
      console.log('Error saving messages:', error);
    }
  };

  const handleAddFriend = () => {
    if (!friendCode.trim()) {
      Alert.alert(t.error, t.enterFriendCode);
      return;
    }

    if (friendCode === myCode) {
      Alert.alert(t.error, t.cannotAddYourself);
      return;
    }

    const existingFriend = friends.find(f => f.code === friendCode);
    if (existingFriend) {
      Alert.alert(t.error, t.friendAlreadyAdded);
      return;
    }

    Alert.prompt(
      t.addFriend,
      t.enterFriendName,
      [
        {
          text: t.cancel,
          style: 'cancel',
        },
        {
          text: t.add,
          onPress: (name) => {
            if (name && name.trim()) {
              const newFriend: Friend = {
                code: friendCode,
                name: name.trim(),
              };
              const updatedFriends = [...friends, newFriend];
              setFriends(updatedFriends);
              saveFriends(updatedFriends);
              setFriendCode("");
              setShowAddFriend(false);
              Alert.alert(t.success, t.friendAdded);
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedFriend) {
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText.trim(),
      senderId: myCode,
      senderName: myName,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    saveMessages(selectedFriend.code, updatedMessages);
    setMessageText("");
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleDeleteFriend = (friend: Friend) => {
    Alert.alert(
      t.deleteFriend,
      t.deleteFriendConfirm,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.delete,
          style: 'destructive',
          onPress: () => {
            const updatedFriends = friends.filter(f => f.code !== friend.code);
            setFriends(updatedFriends);
            saveFriends(updatedFriends);
            if (selectedFriend?.code === friend.code) {
              setSelectedFriend(null);
            }
          },
        },
      ]
    );
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  if (!selectedFriend) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{t.chat}</Text>
            <Text style={styles.headerSubtitle}>{t.chatWithYourLoved}</Text>
          </View>

          {/* My Code Card */}
          <View style={styles.codeCard}>
            <View style={styles.codeHeader}>
              <IconSymbol name="person.circle.fill" color={colors.primary} size={32} />
              <View style={styles.codeInfo}>
                <Text style={styles.codeLabel}>{t.yourCode}</Text>
                <Text style={styles.codeText}>{myCode}</Text>
              </View>
            </View>
            <Text style={styles.codeDescription}>{t.shareThisCode}</Text>
          </View>

          {/* Notice Card */}
          <View style={styles.noticeCard}>
            <IconSymbol name="info.circle.fill" color={colors.accent} size={24} />
            <Text style={styles.noticeText}>{t.chatNotice}</Text>
          </View>

          {/* Add Friend Section */}
          {showAddFriend ? (
            <View style={styles.addFriendCard}>
              <Text style={styles.sectionTitle}>{t.addFriend}</Text>
              <TextInput
                style={styles.input}
                placeholder={t.enterFriendCode}
                placeholderTextColor={colors.textSecondary}
                value={friendCode}
                onChangeText={setFriendCode}
                keyboardType="number-pad"
                maxLength={6}
              />
              <View style={styles.buttonRow}>
                <Pressable 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={() => {
                    setShowAddFriend(false);
                    setFriendCode("");
                  }}
                >
                  <Text style={styles.cancelButtonText}>{t.cancel}</Text>
                </Pressable>
                <Pressable 
                  style={[styles.button, styles.addButton]} 
                  onPress={handleAddFriend}
                >
                  <Text style={styles.addButtonText}>{t.add}</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <Pressable 
              style={styles.addFriendButton} 
              onPress={() => setShowAddFriend(true)}
            >
              <IconSymbol name="person.badge.plus" color={colors.card} size={24} />
              <Text style={styles.addFriendButtonText}>{t.addFriend}</Text>
            </Pressable>
          )}

          {/* Friends List */}
          <View style={styles.friendsSection}>
            <Text style={styles.sectionTitle}>{t.friends}</Text>
            {friends.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="person.2" color={colors.textSecondary} size={48} />
                <Text style={styles.emptyStateText}>{t.noFriendsYet}</Text>
                <Text style={styles.emptyStateSubtext}>{t.addFriendToStart}</Text>
              </View>
            ) : (
              friends.map((friend, index) => (
                <Pressable
                  key={index}
                  style={styles.friendCard}
                  onPress={() => setSelectedFriend(friend)}
                  onLongPress={() => handleDeleteFriend(friend)}
                >
                  <View style={styles.friendIcon}>
                    <IconSymbol name="person.fill" color={colors.primary} size={24} />
                  </View>
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{friend.name}</Text>
                    <Text style={styles.friendCode}>{t.code}: {friend.code}</Text>
                  </View>
                  <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Chat View
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <Pressable onPress={() => setSelectedFriend(null)} style={styles.backButton}>
            <IconSymbol name="chevron.left" color={colors.primary} size={24} />
          </Pressable>
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatHeaderName}>{selectedFriend.name}</Text>
            <Text style={styles.chatHeaderCode}>{t.code}: {selectedFriend.code}</Text>
          </View>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 ? (
            <View style={styles.emptyChat}>
              <IconSymbol name="message" color={colors.textSecondary} size={48} />
              <Text style={styles.emptyChatText}>{t.noMessagesYet}</Text>
              <Text style={styles.emptyChatSubtext}>{t.startConversation}</Text>
            </View>
          ) : (
            messages.map((message, index) => {
              const isMyMessage = message.senderId === myCode;
              return (
                <View
                  key={index}
                  style={[
                    styles.messageBubble,
                    isMyMessage ? styles.myMessage : styles.theirMessage,
                  ]}
                >
                  <Text style={[
                    styles.messageText,
                    isMyMessage ? styles.myMessageText : styles.theirMessageText,
                  ]}>
                    {message.text}
                  </Text>
                  <Text style={[
                    styles.messageTime,
                    isMyMessage ? styles.myMessageTime : styles.theirMessageTime,
                  ]}>
                    {formatTime(message.timestamp)}
                  </Text>
                </View>
              );
            })
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder={t.typeMessage}
            placeholderTextColor={colors.textSecondary}
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={500}
          />
          <Pressable 
            style={[styles.sendButton, !messageText.trim() && styles.sendButtonDisabled]} 
            onPress={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <IconSymbol 
              name="arrow.up.circle.fill" 
              color={messageText.trim() ? colors.card : colors.textSecondary} 
              size={36} 
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  codeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeInfo: {
    marginLeft: 12,
    flex: 1,
  },
  codeLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  codeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 2,
  },
  codeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  noticeCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noticeText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  addFriendButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    boxShadow: '0px 4px 12px rgba(233, 30, 99, 0.3)',
    elevation: 4,
  },
  addFriendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.card,
    marginLeft: 8,
  },
  addFriendCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.card,
  },
  friendsSection: {
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  friendCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  friendIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  friendCode: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  chatHeaderCode: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyChat: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyChatText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  emptyChatSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  myMessageText: {
    color: colors.card,
  },
  theirMessageText: {
    color: colors.text,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  theirMessageTime: {
    color: colors.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
  },
  messageInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  sendButton: {
    padding: 4,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
