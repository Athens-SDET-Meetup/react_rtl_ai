import React, {forwardRef} from 'react';
import type {ForwardedRef} from 'react';
import {Keyboard} from 'react-native';
import type {TextInput} from 'react-native';
import BaseSelectionList from './BaseSelectionList';
import type {BaseSelectionListProps, ListItem} from './types';

function SelectionList<TItem extends ListItem>(props: BaseSelectionListProps<TItem>, ref: ForwardedRef<TextInput>) {
    return (
        <BaseSelectionList<TItem>
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            ref={ref}
            onScrollBeginDrag={() => Keyboard.dismiss()}
        />
    );
}

SelectionList.displayName = 'SelectionList';

export default forwardRef(SelectionList);
