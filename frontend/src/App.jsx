// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [conversation, setConversation] = useState([]);
//   const [isCalling, setIsCalling] = useState(false);

//   const makeCall = async () => {
//     try {
//       setIsCalling(true);
//       await axios.post('https://ai-call-nk48.onrender.com/make-call');
//       alert('Call initiated!');
//     } catch (error) {
//       console.error('Error making call:', error);
//       alert('Failed to initiate call.');
//     } finally {
//       setIsCalling(false);
//     }
//   };

//   useEffect(() => {
//     const fetchConversation = async () => {
//       try {
//         const response = await axios.get('https://ai-call-nk48.onrender.com/conversation-log');
//         setConversation(response.data);
//         console.log(response);
        
//       } catch (error) {
//         console.error('Error fetching conversation log:', error);
//       }
//     };

//     const interval = setInterval(fetchConversation, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">AI Call Interview</h1>

//         <button
//           onClick={makeCall}
//           disabled={isCalling}
//           className={`w-full py-2 px-4 mb-6 text-white font-semibold rounded-md ${
//             isCalling ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {isCalling ? 'Calling...' : 'Start Call'}
//         </button>

//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Conversations</h2>
//           {conversation.length === 0 ? (
//             <p className="text-gray-600">No conversation yet.</p>
//           ) : (
//             conversation.map((item, index) => (
//               <div key={index} className="mb-4">
//                 <p className="text-gray-700">
//                   <span className="font-semibold text-blue-600">AI:</span> {item.question}
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-semibold text-green-600">You:</span> {item.response}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [conversation, setConversation] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number

  const makeCall = async () => {
    if (!phoneNumber) {
      alert('Please enter a phone number.');
      return;
    }

    try {
      setIsCalling(true);
      await axios.post('https://ai-call-nk48.onrender.com/make-call', { phoneNumber });
      alert('Call initiated!');
    } catch (error) {
      console.error('Error making call:', error);
      alert('Failed to initiate call.');
    } finally {
      setIsCalling(false);
    }
  };

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get('https://ai-call-nk48.onrender.com/conversation-log');
        setConversation(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching conversation log:', error);
      }
    };

    const interval = setInterval(fetchConversation, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">AI Call Interview</h1>

        {/* Phone Number Input */}
        <div className="mb-6">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Enter Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="enter mobile number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Call Button */}
        <button
          onClick={makeCall}
          disabled={isCalling}
          className={`w-full py-2 px-4 mb-6 text-white font-semibold rounded-md ${
            isCalling ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isCalling ? 'Calling...' : 'Start Call'}
        </button>

        {/* Conversation Log */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Conversations</h2>
          {conversation.length === 0 ? (
            <p className="text-gray-600">No conversation yet.</p>
          ) : (
            conversation.map((item, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold text-blue-600">AI:</span> {item.question}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-green-600">User:</span> {item.response}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;