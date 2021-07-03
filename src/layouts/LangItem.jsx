import React from 'react'
import { FaStar } from 'react-icons/fa'

function LangItem({lang,langId,level, color, onClick}) {
    const [hoverRating, setHoverRating] = React.useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && level >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = React.useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FaStar
          key={idx}
          className="cursor-pointer"
          onClick={() => {
            onClick(langId,idx);
          }}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [level, level, hoverRating]);
    return (
        <div className="d-flex justify-content-between mtop-10">
            <div className="d-flex">
                <span style={{color:"var(--new)"}}>Dil</span>
                <small style={{marginLeft:20}}>{lang}</small>
            </div>
            <div className="d-flex">
                <span style={{marginRight:20}}>Seviye</span>
                {starRating}
            </div>
        </div>
    )
}

export default LangItem
