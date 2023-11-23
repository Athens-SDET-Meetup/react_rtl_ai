import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import useWindowDimensions from '@hooks/useWindowDimensions';
import createCustomStackNavigator from '@libs/Navigation/AppNavigator/createCustomStackNavigator';
import CustomFullScreenRouter from '@libs/Navigation/AppNavigator/createCustomStackNavigator/CustomFullScreenRouter';
import getRootNavigatorScreenOptions from '@libs/Navigation/AppNavigator/getRootNavigatorScreenOptions';
import * as ModalStackNavigators from '@libs/Navigation/AppNavigator/ModalStackNavigators';
import useThemeStyles from '@styles/useThemeStyles';
import SCREENS from '@src/SCREENS';

const loadPage = () => require('../../../../pages/settings/InitialSettingsPage').default;

const propTypes = {
    /* Navigation functions provided by React Navigation */
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
    }).isRequired,
};

const RootStack = createCustomStackNavigator(CustomFullScreenRouter);

function SettingsNavigator({navigation}) {
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();
    const screenOptions = getRootNavigatorScreenOptions(isSmallScreenWidth);

    console.log('navigation state', navigation.getState());

    return (
        <View style={styles.rootNavigatorContainerStyles(isSmallScreenWidth)}>
            <RootStack.Navigator
                isSmallScreenWidth={isSmallScreenWidth}
                mode="modal"
            >
                <RootStack.Screen
                    name={SCREENS.SETTINGS_HOME}
                    options={screenOptions.homeScreen}
                    getComponent={loadPage}
                />
                <RootStack.Screen
                    name="SettingsCentralPane"
                    options={screenOptions.centralPaneNavigator}
                    component={ModalStackNavigators.AccountSettingsModalStackNavigator}
                />
            </RootStack.Navigator>
        </View>
    );
}

SettingsNavigator.propTypes = propTypes;
SettingsNavigator.displayName = 'SettingsNavigator';

export default SettingsNavigator;
