import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { Ellipse, G, Line, Rect } from 'react-native-svg'
import { createAnimatableComponent } from 'react-native-animatable'

const AnimatableLine = createAnimatableComponent(Line);
const AnimatableRect = createAnimatableComponent(Rect);
const AnimatableEllipse = createAnimatableComponent(Ellipse);

const Figure = ({ wrongWord }) => {
    const Rope = <AnimatableLine animation={'fadeIn'} x1="160" y1="0" x2="160" y2="110" stroke="brown" strokeWidth="5" />
    const Head = <AnimatableEllipse animation={'fadeIn'} cx="160" cy="130" rx="35" ry="35"  />
    const Body = <AnimatableRect animation={'fadeIn'} width="10" height="90" x="155" y="160"  />
    const Arm = <AnimatableLine animation={'fadeIn'} x1="120" y1="208" x2="200" y2="188" stroke="black" strokeWidth="10" />
    const Leg1 = <AnimatableLine animation={'fadeIn'} x1="160" y1="250" x2="120" y2="300" stroke="black" strokeWidth="10" />
    const Leg2 = <AnimatableLine animation={'fadeIn'} x1="160" y1="250" x2="200" y2="300" stroke="black" strokeWidth="10" />

    return (
        <View style={styles.container}>
            <Svg version="1.1" viewBox="0 0 300 400" preserveAspectRatio="xMinYMin meet" class="svg-content" width="140" height="200">
                <Rect width="250" height="10" x="5" y="15" />
                <Rect width="10" height="350" x="20" y="0" />
                <Rect width="250" height="40" x="0" y="350" />
                {wrongWord > 0 ? Rope : null}
                {wrongWord > 1 ? Head : null}
                {wrongWord > 2 ? Body : null}
                {wrongWord > 3 ? Arm : null}
                {wrongWord > 4 ? Leg1 : null}
                {wrongWord > 5 ? Leg2 : null}
            </Svg>
        </View>
    )
}

export default Figure

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
})