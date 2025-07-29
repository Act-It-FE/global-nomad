import { useEffect, useRef, useState } from 'react';

interface UseKeyboardNavigationProps<T> {
  items: T[];
  isOpen: boolean;
  onSelect: (item: T) => void;
  onClose: () => void;
  onOpen: () => void;
}

export function useKeyboardNavigation<T>({
  items,
  isOpen,
  onSelect,
  onClose,
  onOpen,
}: UseKeyboardNavigationProps<T>) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLElement>(null);

  // focusedIndex가 변경될 때마다 실제 포커스 이동
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      const focusedElement = optionRefs.current[focusedIndex];
      focusedElement?.focus();

      // 포커스된 요소가 화면에 보이도록 스크롤 조정
      if (containerRef.current && focusedElement) {
        // 항상 포커스된 요소가 보이도록 스크롤 조정
        focusedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [focusedIndex, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        onOpen();
        setFocusedIndex(0);
      }
    } else {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          setFocusedIndex(-1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0) {
            onSelect(items[focusedIndex]);
            onClose();
            setFocusedIndex(-1);
          }
          break;
      }
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, item: T) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(item);
      onClose();
      setFocusedIndex(-1);
    }
  };

  const resetFocus = () => {
    setFocusedIndex(-1);
  };

  const setOptionRef = (index: number) => (el: HTMLElement | null) => {
    optionRefs.current[index] = el;
  };

  return {
    focusedIndex,
    containerRef,
    handleKeyDown,
    handleOptionKeyDown,
    resetFocus,
    setOptionRef,
  };
}
