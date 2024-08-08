import React from "react";
import moment from "moment";
const Comment = ({ comment }) => {
  return (
    <div className="flex items-center gap-4 border-2 rounded-lg  border-slate-400 mb-4 py-2 px-3">
      <div className="">
        <img
          className="h-9  rounded-full w-9"
          src={comment.user.profilePicture}
          alt=""
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 ">
          <span className="text-sm">{`@${comment.user.userName}`}</span>
          <span className="text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <div>
          <p>{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
