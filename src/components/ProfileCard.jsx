import './ProfileCard.css'

function ProfileCard({ name, title, image }) {
  return (
    <article className="profile-card">
      <div className="profile-card__image-frame">
        <img
          className="profile-card__image"
          src={image}
          alt={`${name} profile`}
        />
      </div>

      <div className="profile-card__content">
        <span className="profile-card__eyebrow">Developer profile</span>
        <h2>{name}</h2>
        <p>{title}</p>
      </div>
    </article>
  )
}

export default ProfileCard
