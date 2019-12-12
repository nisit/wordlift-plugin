/**
 * PropertyComponent : used to display a individual property, has 2 states
 * allow the user to edit it and add a new property
 * @author Naveen Muthusamy <naveen@wordlift.io>
 * @since 3.24.0
 */

import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { PROPERTY_DATA_CHANGED_ACTION } from '../actions/actions';

 class PropertyComponent extends React.Component {
     constructor (props) {
         super(props)
         console.log("property component")
         console.log(props)
     }
     /**
      * When a property item changes this method gets fired
      * @param {String} fieldKey Field Key is the key present in property data
      * @param {Object} event The onChange event when a input field is changed
      */
     handleChangeForPropertyField = ( fieldKey, event)=> {
        const action = PROPERTY_DATA_CHANGED_ACTION
        action.payload = {
            fieldKey: fieldKey,
            value: event.target.value,
            propertyIndex: this.props.propertyIndex
        }
        this.props.dispatch(action)
     }

     render() {
         return (
            <React.Fragment>
                    <a className="row-title">
                       { this.props.propData.propertyHelpText }
                    </a>
                    <br />
                    <table className="wl-container wl-container-full wl-spaced-table wl-property-edit-item">
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    Property Help Text
                                </td>
                                <td>
                                    <input type="text"
                                    value={this.props.propData.propertyHelpText}
                                    placeholder="Telephone"
                                    className="wl-form-control wl-property-help-text"
                                    onChange={ (event)=> 
                                        { this.handleChangeForPropertyField("propertyHelpText", event)
                                    }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    Field Type Help Text
                                </td>
                                <td>
                                    <select className="wl-form-select"
                                        value={this.props.propData.fieldTypeHelpText}
                                        onChange={ (event)=> 
                                            { this.handleChangeForPropertyField("fieldTypeHelpText", event)
                                        }}>
                                        <option value="-1">Custom Field</option>
                                    </select> 
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    Field Help Text
                                </td>
                                <td>
                                    <input type="text" 
                                    placeholder="Contact Form"
                                    className="wl-form-control"
                                    value={this.props.propData.fieldHelpText}
                                    onChange={ (event)=> 
                                        { this.handleChangeForPropertyField("fieldHelpText", event)
                                    }} />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                Transform Help Text
                                </td>
                                <td>
                                    <select className="wl-form-select"
                                        value={this.props.propData.transformHelpText}
                                        onChange={ (event)=> 
                                            { this.handleChangeForPropertyField("transformHelpText", event)
                                        }}>
                                        <option value="-1">None</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"></td>
                                <td>
                                    <button 
                                    disabled={this.props.propData.propertyHelpText.length <= 0}
                                    className="wl-close-mapping button action bg-primary text-white"
                                    onClick={()=> this.props.switchState(this.props.propertyIndex)}>
                                        Close Mapping
                                    </button>
                                </td>
                            </tr>
                    </tbody></table>
            </React.Fragment>
        )
     }
 }

 // supply a property object as data
 PropertyComponent.propTypes = {
     propertyData: PropTypes.object
 }



export default connect()(PropertyComponent)