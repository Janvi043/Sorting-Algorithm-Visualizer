# Sorting Algorithm Visualizer

A beautiful, interactive web application that visualizes sorting algorithms with animated bars. Built with Next.js, TypeScript, and CSS animations.

## Features

- **Three Sorting Algorithms**: Bubble Sort, Selection Sort, and Insertion Sort
- **Random Array Generation**: Generate arrays of random values with customizable size
- **Animated Swaps**: Smooth animations showing comparisons and swaps in real-time
- **Sorted State Indication**: Visual feedback when the array is fully sorted
- **Customizable Speed**: Adjust animation speed from 10ms to 200ms
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Success Criteria Met

✅ **Random Array Generation** - Click "Generate New Array" to create a new random array  
✅ **Swap Animations** - Bars animate with color changes during comparisons and swaps  
✅ **Sorted State Indication** - Green bars and success message when sorting is complete  

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Vercel will automatically detect Next.js and configure the build
5. Click "Deploy" and your app will be live!

Alternatively, use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## How to Use

1. **Select Algorithm**: Choose from Bubble Sort, Selection Sort, or Insertion Sort
2. **Adjust Speed**: Use the speed slider to control animation speed
3. **Set Array Size**: Adjust the array size slider (10-100 elements)
4. **Generate Array**: Click "Generate New Array" to create a new random array
5. **Start Sorting**: Click "Start Sorting" to begin the visualization

## Color Coding

- **Purple**: Default state (unsorted bars)
- **Yellow/Orange**: Bars being compared
- **Red**: Bars being swapped
- **Green**: Sorted bars

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **CSS Modules** - Scoped styling
- **CSS Animations** - Smooth transitions

## License

MIT License - feel free to use this project for learning and development!

