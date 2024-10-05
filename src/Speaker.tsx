import {
	AbsoluteFill,
	Img,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
} from 'remotion';
import {Subtitle} from './Subtitle';
import {Title} from './Title';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';
import {Background} from './Background';

export const myCompSchema = z.object({
	sessionText: z.string(),
	titleColor: zColor(),
	githubUsername: z.string(),
	speakerName: z.string(),
});

const ProfilePicture: React.FC<{githubUsername: string}> = ({
	githubUsername,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const opacity = interpolate(
		frame,
		[0, 20, durationInFrames - 20, durationInFrames],
		[0, 1, 1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);
	return (
		<Img
			src={`https://github.com/${githubUsername}.png`}
			alt={`${githubUsername}'s avatar`}
			className="size-80 rounded-full object-cover my-6"
			style={{opacity}}
		/>
	);
};

export const Speaker: React.FC<z.infer<typeof myCompSchema>> = ({
	sessionText,
	titleColor,
	githubUsername,
	speakerName,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const opacity = interpolate(
		frame,
		[0, 20, durationInFrames - 20, durationInFrames],
		[0, 1, 1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);
	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center relative">
			<Background />
			<div className="flex flex-col gap-8 items-center relative z-100">
				<Title
					titleText={sessionText}
					titleColor={titleColor}
					titleOpacity={opacity}
					titleSize="text-5xl"
				/>
				<ProfilePicture githubUsername={githubUsername} />
				<Title
					titleText={speakerName}
					titleColor={titleColor}
					titleSize="text-5xl"
				/>
				<Subtitle
					titleText="Job title"
					titleColor={titleColor}
					titleSize="text-5xl"
				/>
			</div>
		</AbsoluteFill>
	);
};
