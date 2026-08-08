interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <span>{message}</span>
      <button aria-label="Dismiss error" onClick={onDismiss}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}
