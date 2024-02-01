import type {StackScreenProps} from '@react-navigation/stack';
import isEmpty from 'lodash/isEmpty';
import React, {useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import DisplayNames from '@components/DisplayNames';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import * as Expensicons from '@components/Icon/Expensicons';
import MenuItem from '@components/MenuItem';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import ScreenWrapper from '@components/ScreenWrapper';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {getGroupChatName} from '@libs/GroupChatUtils';
import Navigation from '@libs/Navigation/Navigation';
import * as ReportUtils from '@libs/ReportUtils';
import type {ReportSettingsNavigatorParamList} from '@navigation/types';
import withReportOrNotFound from '@pages/home/report/withReportOrNotFound';
import type {WithReportOrNotFoundProps} from '@pages/home/report/withReportOrNotFound';
import * as ReportActions from '@userActions/Report';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';

type ReportSettingsPageProps = WithReportOrNotFoundProps & StackScreenProps<ReportSettingsNavigatorParamList, typeof SCREENS.REPORT_SETTINGS.ROOT>;

function ReportSettingsPage({report, policies}: ReportSettingsPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    // The workspace the report is on, null if the user isn't a member of the workspace
    const linkedWorkspace = useMemo(() => Object.values(policies ?? {}).find((policy) => policy && policy.id === report?.policyID), [policies, report?.policyID]);
    const shouldDisableRename = useMemo(() => ReportUtils.shouldDisableRename(report, linkedWorkspace), [report, linkedWorkspace]);
    const isMoneyRequestReport = ReportUtils.isMoneyRequestReport(report);

    // We only want policy owners and admins to be able to modify the welcome message, but not in thread chat
    const shouldDisableWelcomeMessage = ReportUtils.shouldDisableWelcomeMessage(report, linkedWorkspace);

    const shouldDisableSettings = isEmpty(report) || ReportUtils.isArchivedRoom(report);
    const shouldShowRoomName = !ReportUtils.isPolicyExpenseChat(report) && !ReportUtils.isChatThread(report);
    const notificationPreference =
        report?.notificationPreference && report.notificationPreference !== CONST.REPORT.NOTIFICATION_PREFERENCE.HIDDEN
            ? translate(`notificationPreferencesPage.notificationPreferences.${report.notificationPreference}`)
            : '';
    const writeCapability = ReportUtils.isAdminRoom(report) ? CONST.REPORT.WRITE_CAPABILITIES.ADMINS : report?.writeCapability ?? CONST.REPORT.WRITE_CAPABILITIES.ALL;

    const writeCapabilityText = translate(`writeCapabilityPage.writeCapability.${writeCapability}`);
    const shouldAllowWriteCapabilityEditing = useMemo(() => ReportUtils.canEditWriteCapability(report, linkedWorkspace), [report, linkedWorkspace]);

    const shouldShowNotificationPref = !isMoneyRequestReport && report?.notificationPreference !== CONST.REPORT.NOTIFICATION_PREFERENCE.HIDDEN;
    const roomNameLabel = translate(isMoneyRequestReport ? 'workspace.editor.nameInputLabel' : 'newRoomPage.roomName');
    const reportName = ReportUtils.isGroupChat(report) ? getGroupChatName(report) : ReportUtils.getReportName(report);

    const shouldShowWriteCapability = !isMoneyRequestReport;

    return (
        <ScreenWrapper testID={ReportSettingsPage.displayName}>
            <FullPageNotFoundView shouldShow={shouldDisableSettings}>
                <HeaderWithBackButton
                    title={translate('common.settings')}
                    onBackButtonPress={() => Navigation.goBack(ROUTES.REPORT_WITH_ID_DETAILS.getRoute(report?.reportID ?? ''))}
                />
                <ScrollView style={[styles.flex1]}>
                    {shouldShowNotificationPref && (
                        <MenuItemWithTopDescription
                            shouldShowRightIcon
                            title={notificationPreference}
                            description={translate('notificationPreferencesPage.label')}
                            onPress={() => Navigation.navigate(ROUTES.REPORT_SETTINGS_NOTIFICATION_PREFERENCES.getRoute(report?.reportID ?? ''))}
                        />
                    )}
                    {shouldShowRoomName && (
                        <OfflineWithFeedback
                            pendingAction={report?.pendingFields?.reportName}
                            errors={report?.errorFields?.reportName}
                            errorRowStyles={[styles.ph5]}
                            onClose={() => ReportActions.clearPolicyRoomNameErrors(report?.reportID ?? '')}
                        >
                            {shouldDisableRename ? (
                                <View style={[styles.ph5, styles.pv3]}>
                                    <Text
                                        style={[styles.textLabelSupporting, styles.lh16, styles.mb1]}
                                        numberOfLines={1}
                                    >
                                        {roomNameLabel}
                                    </Text>
                                    <DisplayNames
                                        fullTitle={reportName ?? ''}
                                        tooltipEnabled
                                        numberOfLines={1}
                                        textStyles={[styles.optionAlternateText, styles.pre]}
                                        shouldUseFullTitle
                                    />
                                </View>
                            ) : (
                                <MenuItemWithTopDescription
                                    shouldShowRightIcon
                                    title={report?.reportName}
                                    description={translate('newRoomPage.roomName')}
                                    onPress={() => Navigation.navigate(ROUTES.REPORT_SETTINGS_ROOM_NAME.getRoute(report?.reportID ?? ''))}
                                />
                            )}
                        </OfflineWithFeedback>
                    )}
                    {shouldShowWriteCapability &&
                        (shouldAllowWriteCapabilityEditing ? (
                            <MenuItemWithTopDescription
                                shouldShowRightIcon
                                title={writeCapabilityText}
                                description={translate('writeCapabilityPage.label')}
                                onPress={() => Navigation.navigate(ROUTES.REPORT_SETTINGS_WRITE_CAPABILITY.getRoute(report?.reportID ?? ''))}
                            />
                        ) : (
                            <View style={[styles.ph5, styles.pv3]}>
                                <Text
                                    style={[styles.textLabelSupporting, styles.lh16, styles.mb1]}
                                    numberOfLines={1}
                                >
                                    {translate('writeCapabilityPage.label')}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={[styles.optionAlternateText, styles.pre]}
                                >
                                    {writeCapabilityText}
                                </Text>
                            </View>
                        ))}
                    <View style={[styles.ph5]}>
                        {Boolean(linkedWorkspace) && (
                            <View style={[styles.pv3]}>
                                <Text
                                    style={[styles.textLabelSupporting, styles.lh16, styles.mb1]}
                                    numberOfLines={1}
                                >
                                    {translate('workspace.common.workspace')}
                                </Text>
                                <DisplayNames
                                    fullTitle={linkedWorkspace?.name ?? ''}
                                    tooltipEnabled
                                    numberOfLines={1}
                                    textStyles={[styles.optionAlternateText, styles.pre]}
                                    shouldUseFullTitle
                                />
                            </View>
                        )}
                        {Boolean(report?.visibility) && (
                            <View style={[styles.pv3]}>
                                <Text
                                    style={[styles.textLabelSupporting, styles.lh16, styles.mb1]}
                                    numberOfLines={1}
                                >
                                    {translate('newRoomPage.visibility')}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={[styles.reportSettingsVisibilityText]}
                                >
                                    {report?.visibility && translate(`newRoomPage.visibilityOptions.${report.visibility}`)}
                                </Text>
                                <Text style={[styles.textLabelSupporting, styles.mt1]}>{report?.visibility && translate(`newRoomPage.${report.visibility}Description`)}</Text>
                            </View>
                        )}
                    </View>
                    {!shouldDisableWelcomeMessage && (
                        <MenuItem
                            title={translate('welcomeMessagePage.welcomeMessage')}
                            icon={Expensicons.ChatBubble}
                            onPress={() => Navigation.navigate(ROUTES.REPORT_WELCOME_MESSAGE.getRoute(report?.reportID ?? ''))}
                            shouldShowRightIcon
                        />
                    )}
                </ScrollView>
            </FullPageNotFoundView>
        </ScreenWrapper>
    );
}

ReportSettingsPage.displayName = 'ReportSettingsPage';

export default withReportOrNotFound()(ReportSettingsPage);
