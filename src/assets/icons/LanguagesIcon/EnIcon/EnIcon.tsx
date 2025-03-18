import React, {FC} from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Mask, Path, Rect} from 'react-native-svg';

type TProps = {
  size: number;
  hasNotMargin?: boolean;

  offset: number;
};

export const EnIcon: FC<TProps> = ({size, hasNotMargin, offset = 22}) => {
  return (
    <View
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: hasNotMargin ? 0 : 12,

        justifyContent: 'center',
        alignItems: 'center',

        height: size - offset,
      }}>
      <Svg width={size} height={size} viewBox="0 0 90 65" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 0V64.5H90V0H0Z"
          fill="#2E42A5"
        />
        <Mask id="mask0_822_3067" x="0" y="0" width="90" height="65">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 0V64.5H90V0H0Z"
            fill="white"
          />
        </Mask>
        <G mask="url(#mask0_822_3067)">
          <Mask id="mask1_822_3067" x="0" y="0" width="90" height="65">
            <Path d="M0 0H90V64.5H0V0Z" fill="white" />
          </Mask>
          <G mask="url(#mask1_822_3067)">
            <Path
              d="M-10.0208 59.8909L9.78487 67.897L90.4474 8.70212L100.896 -3.19276L79.7177 -5.86682L46.8171 19.6402L20.3346 36.8295L-10.0208 59.8909V59.8909Z"
              fill="white"
            />
            <Path
              d="M-7.3125 65.4997L2.78156 70.1437L97.1437 -4.29733H82.9772L-7.30969 65.4971L-7.3125 65.4997Z"
              fill="#F50100"
            />
            <Path
              d="M100.021 59.8909L80.2152 67.897L-0.447314 8.70212L-10.8958 -3.19276L10.2824 -5.86682L43.183 19.6402L69.6655 36.8295L100.021 59.8909Z"
              fill="white"
            />
            <Path
              d="M99.3458 63.9168L89.2546 68.5608L49.0752 36.6871L37.1615 33.1288L-11.9026 -3.15244H2.26679L51.2999 32.2688L64.3246 36.5366L99.3458 63.9168Z"
              fill="#F50100"
            />
            <Mask id="mask2_822_3067" x="-6" y="-6" width="102" height="76">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M55.6255 -5.375H34.3742V21.5H-5.54639V43H34.3742V69.875H55.6255V43H95.7036V21.5H55.6255V-5.375V-5.375Z"
                fill="white"
              />
            </Mask>
            <G mask="url(#mask2_822_3067)">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M55.6255 -5.375H34.3742V21.5H-5.54639V43H34.3742V69.875H55.6255V43H95.7036V21.5H55.6255V-5.375V-5.375Z"
                fill="#F50100"
              />
              <Path
                d="M34.3742 -5.375V-10.75H28.7492V-5.375H34.3742ZM55.6255 -5.375H61.2505V-10.75H55.6255V-5.375ZM34.3742 21.5V26.875H39.9992V21.5H34.3742ZM-5.54639 21.5V16.125H-11.1714V21.5H-5.54639ZM-5.54639 43H-11.1714V48.375H-5.54639V43ZM34.3742 43H39.9992V37.625H34.3742V43ZM34.3742 69.875H28.7492V75.25H34.3742V69.875ZM55.6255 69.875V75.25H61.2505V69.875H55.6255ZM55.6255 43V37.625H50.0005V43H55.6255ZM95.7036 43V48.375H101.329V43H95.7036ZM95.7036 21.5H101.329V16.125H95.7036V21.5ZM55.6255 21.5H50.0005V26.875H55.6255V21.5ZM34.3742 0H55.6255V-10.75H34.3742V0ZM39.9992 21.5V-5.375H28.7492V21.5H39.9992ZM-5.54639 26.875H34.3742V16.125H-5.54639V26.875V26.875ZM0.0786133 43V21.5H-11.1714V43H0.0786133ZM34.3742 37.625H-5.54639V48.375H34.3742V37.625V37.625ZM39.9992 69.875V43H28.7492V69.875H39.9992ZM55.6255 64.5H34.3742V75.25H55.6255V64.5ZM50.0005 43V69.875H61.2505V43H50.0005ZM95.7036 37.625H55.6255V48.375H95.7036V37.625ZM90.0786 21.5V43H101.329V21.5H90.0786ZM55.6255 26.875H95.7036V16.125H55.6255V26.875ZM50.0005 -5.375V21.5H61.2505V-5.375H50.0005Z"
                fill="white"
              />
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
};
