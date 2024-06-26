import React, {memo} from 'react';
import PDFView from '@components/PDFView';
import {attachmentViewPdfDefaultProps, attachmentViewPdfPropTypes} from './propTypes';

function AttachmentViewPdf({file, encryptedSourceUrl, isFocused, onPress, onToggleKeyboard, onLoadComplete, errorLabelStyles, style}) {
    return (
        <PDFView
            onPress={onPress}
            isFocused={isFocused}
            sourceURL={encryptedSourceUrl}
            fileName={file.name}
            style={style}
            onToggleKeyboard={onToggleKeyboard}
            onLoadComplete={onLoadComplete}
            errorLabelStyles={errorLabelStyles}
        />
    );
}

AttachmentViewPdf.propTypes = attachmentViewPdfPropTypes;
AttachmentViewPdf.defaultProps = attachmentViewPdfDefaultProps;

export default memo(AttachmentViewPdf);
