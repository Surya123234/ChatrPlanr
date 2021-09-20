import React from 'react';
import { StreamChat } from 'stream-chat';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageInputSmall,
  VirtualizedMessageList,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

const ChatComponent = (props) => {
  const chatClient = StreamChat.getInstance('dz5f4d5kzrue');
  const userToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibXV0ZS1sZWFmLTQiLCJleHAiOjE2MzE5OTc5NDZ9.xYpdDx49ou1SHnjaZMbhSz0Ryee9yma8Fx4vYWjGYr8';

  chatClient.connectUser(
    {
      id: 'mute-leaf-4',
      name: 'mute',
      image: 'https://getstream.io/random_png/?id=mute-leaf-4&name=mute',
    },
    userToken
  );

  const channel = chatClient.channel(
    'team',
    props.id + 'teacherchannel1iujeiof',
    {
      name: 'Something Else discussion',
    }
  );

  const state = channel.watch();
  channel.on('message.new', (event) => {
    let message = channel.lastMessage();
    console.log(message.text);
    scheduleEvent(message);
  });

  function scheduleEvent(message) {
    let text = message.text;
    if (text.startsWith('$schedule')) {
      let event = text.substring(10);
      splitMessage(event);
    }
  }

  function splitMessage(text) {
    let split = text.split(', ');
    let newEvent = {
      title: split[0],
      //start: split[1], // 2021/09/18 12:30

      start: findingDateAndTime(split[1]),

      end: findingDateAndTime(split[2]),
      description: split[3],
    };
    const eventString = 'calender' + props.id;
    let eventArray = JSON.parse(localStorage.getItem(eventString));
    if (!eventArray) {
      eventArray = [];
    }
    eventArray.push(newEvent);
    console.log(eventArray);
    localStorage.setItem(eventString, JSON.stringify(eventArray));
  }

  function findingDateAndTime(info) {
    // 2021-09-27T11:30, 2021-09-27T12:30
    // 2021/09/18 12:30

    let date = info.substring(0, 10);
    let splitDate = date.split('/');
    let year = splitDate[0];
    let month = splitDate[1];
    let day = splitDate[2];

    let time = info.substring(11, 16);

    return `${year}-${month}-${day}T${time}`;
  }

  return (
    <Chat client={chatClient} theme="light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader live />
          <VirtualizedMessageList />
          <MessageInput Input={MessageInputSmall} focus />
        </Window>
      </Channel>
    </Chat>
  );
};

export default ChatComponent;
