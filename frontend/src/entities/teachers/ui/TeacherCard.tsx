import { Link } from 'react-router'

export default function TeacherCard({item, isInteractive}) {
  if (!item) return null
    const CardWrapper = isInteractive ? Link : 'div'
    const linkProp = isInteractive 
    ? {to: `/teachers/${item.id}`, className: 'card-wrapper'} 
    : {className: 'card-wrapper'}
  return (
    <CardWrapper {...linkProp as any}>
          <div className="teacher-card">
            <img
              style={{
                width: "250px",
              }}
              src={
                item.photo &&
                "https://avatars.mds.yandex.net/i?id=27db6cca40d574550117995c640ab6c2a42bdeb7-5283209-images-thumbs&n=13"
              }
              className="t-photo"
              alt={item.name + " photo"}
            />
            <h2 className="teacher-name">{item.name}</h2>
            <p className="teacher-rating">{item.rating}</p>
            <span className="teacher-price">{item.price}</span>
            <p className="teacher-instrument">{item.instrument}</p>
          </div>
    </CardWrapper>
  )
}
