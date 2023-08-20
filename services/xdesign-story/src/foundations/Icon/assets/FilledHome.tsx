import { SvgProps } from '../Icon.types';

export const FilledHome = (props: SvgProps) => {
    return (
        <svg {...props}>
            <path
                d="M10.5 44C9.2625 44 8.20312 43.5524 7.32187 42.6571C6.44062 41.7619 6 40.6857 6 39.4286V18.8571C6 18.1333 6.15938 17.4476 6.47812 16.8C6.79687 16.1524 7.2375 15.619 7.8 15.2L21.3 4.91429C21.7125 4.60952 22.1437 4.38095 22.5938 4.22857C23.0437 4.07619 23.5125 4 24 4C24.4875 4 24.9562 4.07619 25.4062 4.22857C25.8562 4.38095 26.2875 4.60952 26.7 4.91429L40.2 15.2C40.7625 15.619 41.2031 16.1524 41.5219 16.8C41.8406 17.4476 42 18.1333 42 18.8571V39.4286C42 40.6857 41.5594 41.7619 40.6781 42.6571C39.7969 43.5524 38.7375 44 37.5 44H28.5V28H19.5V44H10.5Z"
                fill="currentColor"
            />
        </svg>
    );
};
