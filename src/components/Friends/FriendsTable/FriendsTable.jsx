import React from "react";
import "./FriendsTable.css";
import { FaRegCommentAlt } from 'react-icons/fa';
import { useChat } from '../../../context/ChatContext'
import { useNavigation } from '../../../context/NavigationContext';
import { useFriends } from '../../../context/FriendsContext';

const FriendsTable = () => {
  const { currentActiveChat, changeCurrentActiveChat } = useChat();
  const { navagation, navagate } = useNavigation();
  const { friends } = useFriends();
  
  // const friends = [
  //   { id: 1, initials: "JD", name: "John Doe" },
  //   { id: 2, initials: "JS", name: "Jane Smith" },
  //   { id: 3, initials: "AM", name: "Alex Martin" },
  //   { id: 4, initials: "ES", name: "Emily Summers" },
  // ];

  const editCurrentActiveChat = (id) => {
    navagate("chat");
    changeCurrentActiveChat(id);
  }

  const colorDictionary = {
    "#000000": "#ffffff", // black color -> white text
    // "#ffffff": "#000000", // white color -> black text
    "#ff0000": "#00ffff", // red color -> cyan text
    "#00ff00": "#ff0000", // green color -> red text
    "#0000ff": "#ffff00", // blue color -> yellow text
    "#ffff00": "#0000ff", // yellow color -> blue text
    "#ff00ff": "#00ff00", // magenta color -> green text
    "#00ffff": "#ff00ff", // cyan color -> magenta text
    "#ffa500": "#000000", // orange color -> black text
    "#800080": "#ffffff", // purple color -> white text
    "#008000": "#ffffff", // dark green color -> white text
    "#800000": "#ffffff", // maroon color -> white text
    "#808080": "#ffffff", // gray color -> white text
    "#c0c0c0": "#000000", // silver color -> black text
    "#ff69b4": "#000000", // hot pink color -> black text
    "#aqua": "#800080", // aqua color -> purple text
    "#fuchsia": "#008000", // fuchsia color -> dark green text
    "#lime": "#800000", // lime color -> maroon text
    "#silver": "#000080", // silver color -> navy text
    "#d3d3d3": "#800080", // light gray color -> purple text
  };

  const getRandomColor = () => {
    const colors = Object.keys(colorDictionary);
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getRandomTextColor = (color) => {
    return colorDictionary[color];
  };

  return (
    <div className="friends-table-container">
      <div className="friends-table-header">
        All Friends: {friends.length}
      </div>
      <table className="friends-table">
        <tbody>
          {friends.map((friend) => (
            <tr key={friend.id} className="friends-table-row">
              <td className="friends-table-cell-avatar">
                <div className="friends-avatar"
                // style={{
                //   backgroundColor: getRandomColor(),
                //   color: getRandomTextColor(getRandomColor()),
                // }}
                >
                  {friend.initials}</div>
              </td>
              <td className="friends-table-cell-name">{friend.firstname} {friend.lastname}</td>
              <td className="friends-table-cell-action">
                <button className="friends-message-button" onClick={() => editCurrentActiveChat(friend.id)}>
                  <FaRegCommentAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FriendsTable;
