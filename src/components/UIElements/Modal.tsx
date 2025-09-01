import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "0.5em",
    padding: "1.25em",
    width: "25em",
    maxWidth: "90%",
    boxShadow: "0 0.25em 0.75em rgba(0,0,0,0.2)",
    position: "relative",
    animation: "fadeIn 0.3s ease",
  },
  closeButton: {
    position: "absolute",
    top: "0.625em",
    right: "0.625em",
    background: "transparent",
    border: "none",
    fontSize: "1.25em",
    cursor: "pointer",
  },
  content: {
    marginTop: "1.25em",
  },
};
