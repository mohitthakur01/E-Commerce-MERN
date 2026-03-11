import { useParams } from "react-router";

const OrderSuccess = () => {
  const { id } = useParams();

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

        {/* Success Icon */}
        <div className="text-green-500 text-6xl mb-4">✅</div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Your Order ID:
          <span className="block font-semibold text-gray-900 mt-1">
            {id}
          </span>
        </p>

        <button
          onClick={goHome}
          className="w-full bg-blue-600 text-white py-3 rounded-xl 
          font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
};

export default OrderSuccess;