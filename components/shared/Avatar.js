import dayjs from "dayjs";
import "dayjs/locale/sv";

const Avatar = ({ image, title, date, imageRight }) => {
  return (
    <div className="media avatar-box">
      {imageRight ? (
        <>
          <div className="d-flex align-self-center">
            <h5 className="mt-0 mb-0 align-self-center title">{title}</h5>
            {date && (
              <p className="mt-0 subtitle">
                {dayjs(date).locale("sv").format("LLLL")}
              </p>
            )}
            <img className="ml-2" src={image} />
          </div>
        </>
      ) : (
        <>
          <img className="mr-2" src={image} />
          <div className="media-body align-self-center">
            <h5 className="mt-0 mb-0">{title}</h5>
            {date && (
              <p className="mt-0 subtitle">
                {dayjs(date).locale("sv").format("LLLL")}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Avatar;
