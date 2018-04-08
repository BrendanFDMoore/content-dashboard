import { Reducer } from 'redux';

import { Action, TypeKeys } from '../actions';

import { DRAG_MODULE } from '../actions/dragModule';
import DragModuleAction = DRAG_MODULE.DragModuleAction;

import { DROP_MODULE } from '../actions/dropModule';
import DropModuleAction = DROP_MODULE.DropModuleAction;

import { ClassModule } from '../../scenes/home/home.content';

export interface ModuleState {
    modules: ClassModule[];
    timeline: ClassModule[];
}

export type ModuleReducerMap =  {[action: string]: Reducer<ModuleState>};

const ModuleReducerMap: ModuleReducerMap = {
    [TypeKeys.DRAG_MODULE]: (state: ModuleState, action: DragModuleAction): ModuleState => {
        return state;
    },
    [TypeKeys.DROP_MODULE]: (state: ModuleState, action: DropModuleAction): ModuleState => {
        const moduleIndex = state.modules.findIndex(module => module.id === action.payload.id);

        if (moduleIndex > -1) {
            return {
                ...state,
                modules: state.modules.slice(0, moduleIndex)
                    .concat(
                        state.modules.slice(moduleIndex + 1)
                    ),

                timeline: (state.timeline || []).concat([state.modules[moduleIndex]])
            };
        }

        return state;
    }
};

const moduleReducer = (state: ModuleState = null, action: Action) => {
    if (action && ModuleReducerMap.hasOwnProperty(action.type)) {
        return ModuleReducerMap[action.type](state, action);
    }

    return state;
};

export interface ModuleReducer {
    module: Reducer<ModuleState>;
}

export interface ModuleReducerState {
    module: ModuleState;
}

export const ModuleReducer: ModuleReducer = {
    module: moduleReducer
};
