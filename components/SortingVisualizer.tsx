'use client';

import { useState } from 'react';
import styles from './SortingVisualizer.module.css';

interface Bar {
  value: number;
  isComparing: boolean;
  isSwapping: boolean;
  isSorted: boolean;
}

type SortingAlgorithm = 'bubble' | 'selection' | 'insertion';

export default function SortingVisualizer() {
  const [array, setArray] = useState<Bar[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [speed, setSpeed] = useState(50); // milliseconds delay
  const [arraySize, setArraySize] = useState<string>('30');
  const [hasArray, setHasArray] = useState(false);

  // Generate random array
  const generateRandomArray = () => {
    const size = parseInt(arraySize);
    if (isNaN(size) || size < 5 || size > 100) {
      alert('Please enter a valid array size between 5 and 100');
      return;
    }

    const newArray: Bar[] = Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 500) + 10,
      isComparing: false,
      isSwapping: false,
      isSorted: false,
    }));
    setArray(newArray);
    setIsSorted(false);
    setHasArray(true);
  };

  // Bubble Sort
  const bubbleSort = async (arr: Bar[]): Promise<Bar[]> => {
    const newArr = [...arr];
    const n = newArr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Mark comparing
        newArr[j].isComparing = true;
        newArr[j + 1].isComparing = true;
        setArray([...newArr]);
        await new Promise((resolve) => setTimeout(resolve, speed));

        if (newArr[j].value > newArr[j + 1].value) {
          // Mark swapping
          newArr[j].isSwapping = true;
          newArr[j + 1].isSwapping = true;
          setArray([...newArr]);
          await new Promise((resolve) => setTimeout(resolve, speed / 2));

          // Swap
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];

          // Unmark swapping
          newArr[j].isSwapping = false;
          newArr[j + 1].isSwapping = false;
          setArray([...newArr]);
          await new Promise((resolve) => setTimeout(resolve, speed / 2));
        }

        // Unmark comparing
        newArr[j].isComparing = false;
        newArr[j + 1].isComparing = false;
      }
      // Mark sorted element
      newArr[n - i - 1].isSorted = true;
      setArray([...newArr]);
    }
    // Mark first element as sorted
    newArr[0].isSorted = true;
    return newArr;
  };

  // Selection Sort
  const selectionSort = async (arr: Bar[]): Promise<Bar[]> => {
    const newArr = [...arr];
    const n = newArr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < n; j++) {
        // Mark comparing
        newArr[j].isComparing = true;
        newArr[minIdx].isComparing = true;
        setArray([...newArr]);
        await new Promise((resolve) => setTimeout(resolve, speed));

        if (newArr[j].value < newArr[minIdx].value) {
          newArr[minIdx].isComparing = false;
          minIdx = j;
        }

        // Unmark comparing
        newArr[j].isComparing = false;
        if (minIdx !== j) {
          newArr[minIdx].isComparing = false;
        }
      }

      if (minIdx !== i) {
        // Mark swapping
        newArr[i].isSwapping = true;
        newArr[minIdx].isSwapping = true;
        setArray([...newArr]);
        await new Promise((resolve) => setTimeout(resolve, speed / 2));

        // Swap
        [newArr[i], newArr[minIdx]] = [newArr[minIdx], newArr[i]];

        // Unmark swapping
        newArr[i].isSwapping = false;
        newArr[minIdx].isSwapping = false;
        setArray([...newArr]);
        await new Promise((resolve) => setTimeout(resolve, speed / 2));
      }

      // Mark sorted element
      newArr[i].isSorted = true;
      setArray([...newArr]);
    }
    // Mark last element as sorted
    newArr[n - 1].isSorted = true;
    return newArr;
  };

  // Insertion Sort
  const insertionSort = async (arr: Bar[]): Promise<Bar[]> => {
    const newArr = [...arr];
    const n = newArr.length;

    for (let i = 1; i < n; i++) {
      const key = newArr[i];
      let j = i - 1;

      // Mark comparing
      key.isComparing = true;
      if (j >= 0) newArr[j].isComparing = true;
      setArray([...newArr]);
      await new Promise((resolve) => setTimeout(resolve, speed));

      while (j >= 0 && newArr[j].value > key.value) {
        // Mark swapping
        newArr[j].isSwapping = true;
        key.isSwapping = true;
        setArray([...newArr]);
        await new Promise((resolve) => setTimeout(resolve, speed / 2));

        newArr[j + 1] = newArr[j];
        newArr[j].isSwapping = false;
        newArr[j].isComparing = false;
        j--;

        if (j >= 0) {
          newArr[j].isComparing = true;
        }
        setArray([...newArr]);
        await new Promise((resolve) => setTimeout(resolve, speed / 2));
      }

      key.isSwapping = false;
      key.isComparing = false;
      newArr[j + 1] = key;
      newArr[j + 1].isSorted = true;
      setArray([...newArr]);
    }

    // Mark all as sorted
    newArr.forEach((bar) => {
      bar.isSorted = true;
    });
    return newArr;
  };

  const startSorting = async () => {
    if (isSorting || !hasArray || array.length === 0) {
      if (!hasArray || array.length === 0) {
        alert('Please generate an array first!');
      }
      return;
    }

    setIsSorting(true);
    setIsSorted(false);

    // Reset array states
    const resetArray = array.map((bar) => ({
      ...bar,
      isComparing: false,
      isSwapping: false,
      isSorted: false,
    }));
    setArray(resetArray);
    await new Promise((resolve) => setTimeout(resolve, 100));

    let sortedArray: Bar[];

    switch (algorithm) {
      case 'bubble':
        sortedArray = await bubbleSort(resetArray);
        break;
      case 'selection':
        sortedArray = await selectionSort(resetArray);
        break;
      case 'insertion':
        sortedArray = await insertionSort(resetArray);
        break;
      default:
        sortedArray = resetArray;
    }

    // Final sorted state - mark all bars as sorted
    const finalArray = sortedArray.map((bar) => ({
      ...bar,
      isComparing: false,
      isSwapping: false,
      isSorted: true,
    }));
    setArray(finalArray);
    setIsSorted(true);
    setIsSorting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sorting Algorithm Visualizer</h1>
        <p className={styles.subtitle}>Watch sorting algorithms in action!</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="size">Enter Array Size (5-100):</label>
          <input
            id="size"
            type="number"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => {
              setArraySize(e.target.value);
              setHasArray(false);
              setIsSorted(false);
            }}
            disabled={isSorting}
            className={styles.input}
            placeholder="Enter size"
          />
        </div>

        <button
          onClick={generateRandomArray}
          disabled={isSorting}
          className={styles.button}
        >
          Generate Random Array
        </button>

        <div className={styles.controlGroup}>
          <label htmlFor="algorithm">Select Sorting Algorithm:</label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as SortingAlgorithm)}
            disabled={isSorting || !hasArray}
            className={styles.select}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="speed">Animation Speed:</label>
          <input
            id="speed"
            type="range"
            min="10"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
            className={styles.slider}
          />
          <span className={styles.speedValue}>{speed}ms</span>
        </div>

        <button
          onClick={startSorting}
          disabled={isSorting || !hasArray}
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          {isSorting ? 'Sorting...' : 'Sort'}
        </button>
      </div>

      {isSorted && (
        <div className={styles.sortedIndicator}>
          ✓ Array is sorted!
        </div>
      )}

      <div className={styles.visualization}>
        {array.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Enter array size and click &quot;Generate Random Array&quot; to start</p>
          </div>
        ) : (
          array.map((bar, index) => (
            <div
              key={index}
              className={`${styles.bar} ${
                bar.isComparing ? styles.comparing : ''
              } ${bar.isSwapping ? styles.swapping : ''} ${
                bar.isSorted ? styles.sorted : ''
              }`}
              style={{
                height: `${bar.value}px`,
                width: `${100 / array.length}%`,
              }}
              title={`Value: ${bar.value}`}
            />
          ))
        )}
      </div>
    </div>
  );
}

