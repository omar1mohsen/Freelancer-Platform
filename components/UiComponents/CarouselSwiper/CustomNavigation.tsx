import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

function CustomNavigation({ swiperRef }:any) {

    const onPrev=() => swiperRef.current?.slidePrev()
    const onNext=() => swiperRef.current?.slideNext()
 
  return (
    <div className={`custom-arrows`} data-aos="fade-up">
      <button
        onClick={onNext}
        className="arrow-btn"
      >
        <MdArrowBackIos className="text-secondary size-5 font-extrabold"/>
      </button>

      <button
        onClick={ onPrev}
        className="arrow-btn"
      >
        <MdArrowForwardIos className="text-secondary size-5 font-extrabold" />
      </button>
    </div>
  );
}

export default CustomNavigation;