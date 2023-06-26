import Button from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Design System/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  //   argTypes: {
  //     backgroundColor: {
  //       control: 'color',
  //     },
  //   },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    mode: 'primary',
    label: 'Button',
  },
};

export const Blue = {
  args: {
    mode: 'blue',
    label: 'Button',
  },
};

export const Red = {
  args: {
    mode: 'red',
    label: 'Button',
  },
};

// export const Large = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };

// export const Small = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
