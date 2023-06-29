import Loader from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Design System/Atoms/Loader',
    component: Loader,
    tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const isLoading = {
    args: {
        loading: true,
    },
};
