import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
//IE Fixes
import 'core-js/es6/number';
import 'core-js/es6/array';
import { PropertyFieldPeoplePicker, PrincipalType, IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import * as strings from 'DoctorsAppointmentWebPartStrings';
import DoctorsAppointment from './components/DoctorsAppointment';
import { IDoctorsAppointmentProps } from './components/IDoctorsAppointmentProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import pnp from "sp-pnp-js";

export interface IDoctorsAppointmentWebPartProps {
  trainingSession: string;
  trainingSlots: string;
  doctorsAppointments: string;
  timeZone: string;
  group: IPropertyFieldGroupOrPerson[];
}

export default class DoctorsAppointmentWebPart extends BaseClientSideWebPart<IDoctorsAppointmentWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {

      pnp.setup({
        spfxContext: this.context
      });

    });
  }

  public render(): void {
    const element: React.ReactElement<IDoctorsAppointmentProps> = React.createElement(
      DoctorsAppointment,
      {
        siteURL: this.context.pageContext.web.absoluteUrl,
        trainingSession: this.properties.trainingSession,
        trainingSlots: this.properties.trainingSlots,
        doctorsAppointments: this.properties.doctorsAppointments,
        loggedInUserName: this.context.pageContext.user.displayName,
        loggedInUserEmail: this.context.pageContext.user.email,
        userGroup: this.properties.group,
        timeZone: this.properties.timeZone
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied() {
    this.render();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldListPicker('trainingSession', {
                  label: 'Select list to populate Training Type',
                  selectedList: this.properties.trainingSession,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'trainingSession',
                  baseTemplate: 100
                }),
                PropertyFieldListPicker('trainingSlots', {
                  label: 'Select list to populate Training Slots',
                  selectedList: this.properties.trainingSlots,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'trainingSlots',
                  baseTemplate: 100
                }),
                PropertyFieldListPicker('doctorsAppointments', {
                  label: 'Select list to populate Store Data',
                  selectedList: this.properties.doctorsAppointments,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'doctorsAppointments',
                  baseTemplate: 100
                }),
                PropertyFieldListPicker('timeZone', {
                  label: 'Select list to populate Timezone Data',
                  selectedList: this.properties.timeZone,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'timeZone',
                  baseTemplate: 100
                }),
                PropertyFieldPeoplePicker('group', {
                  label: "Select Doctor's Group",
                  initialData: this.properties.group,
                  allowDuplicate: false,
                  principalType: [PrincipalType.SharePoint],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'groupFieldID',
                  multiSelect: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
