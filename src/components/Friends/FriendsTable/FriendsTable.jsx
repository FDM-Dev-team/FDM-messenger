import React from "react";
import "./FriendsTable.css";
import { FaRegCommentAlt } from 'react-icons/fa';
import { useFriends } from '../../../context/FriendsContext';

const FriendsTable = () => {
  const { friends } = useFriends();
  // const friends = [
  //   { id: 1, initials: "JD", name: "John Doe" },
  //   { id: 2, initials: "JS", name: "Jane Smith" },
  //   { id: 3, initials: "AM", name: "Alex Martin" },
  //   { id: 4, initials: "ES", name: "Emily Summers" },
  // ];

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
                <div className="friends-avatar">{friend.initials}</div>
              </td>
              <td className="friends-table-cell-name">{friend.firstname} {friend.lastname}</td>
              <td className="friends-table-cell-action">
                <button className="friends-message-button">
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
