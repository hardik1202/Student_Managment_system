export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
