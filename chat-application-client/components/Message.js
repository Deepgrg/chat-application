const Message = (props) => {
  const { message, authorName, username } = props;

  let messageBlock;

  messageBlock = (
    <div className="self-start justify-start w-3/4 bg-green-200 rounded-md flex space-x-2 px-4 py-3 items-center">
      <span className="capitalize font-semibold underline">{authorName}</span>
      <p className="text-lg">{message}</p>
    </div>
  );

  if (authorName == "admin") {
    messageBlock = (
      <div className="self-center justify-start w-1/2  px-4 py-3 bg-gray-300 rounded-2xl">
        <p className="text-sm">{message}</p>
      </div>
    );
  }

  if (authorName == username) {
    messageBlock = (
      <div className="self-end justify-start w-3/4 bg-blue-200 rounded-md px-4 py-3">
        <p className="text-lg">{message}</p>
      </div>
    );
  }

  return messageBlock;
};

export default Message;
