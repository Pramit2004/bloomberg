export default function Tag({ children, className = '' }) {
  return (
    <span
      className={`tag ${className}`}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {children}
    </span>
  )
}
