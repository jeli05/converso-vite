import React from 'react';
import './SlidingSheet.css';

interface SlidingSheetProps {
  isVisible: boolean;
  onCopy: () => void;
}

const SlidingSheet: React.FC<SlidingSheetProps> = ({ isVisible, onCopy }) => {
  return (
    <div className={`sheet ${isVisible ? 'open' : 'closed'}`}>
      <p>Good work! 💪</p>
      <button onClick={onCopy}>Copy to Clipboard</button>
    </div>
  );
};

export default SlidingSheet;
