import Marquee from "react-fast-marquee";
import Pattern from '../../assets/greek_pattern_style.png';

export default function Banner() {
    return (
    <div className="w-full h-24 overflow-hidden relative">
        <Marquee speed={50} gradient={false}>
        <img src={Pattern} alt="pattern" className="h-24 object-contain" />
        <img src={Pattern} alt="pattern duplicate" className="h-24 object-contain" />
        </Marquee>
    </div>
    );
}