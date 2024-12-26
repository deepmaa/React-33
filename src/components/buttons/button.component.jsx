export const FormSubmitButton = ({loading = false}) => {
  return (
    <>
      <button
        type="submit" disabled={loading}
        className="disabled:cursor-not-allowed disabled:bg-teal-500 disabled:hover:bg-teal-500  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Register
      </button>
    </>
  );
};
