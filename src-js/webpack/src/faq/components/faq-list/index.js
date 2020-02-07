/**
 * FaqList for showing the list of questions.
 * @since 3.26.0
 * @author Naveen Muthusamy
 *
 */

/**
 * External dependencies.
 */
import React from "react";
import { connect } from "react-redux";

/**
 * Internal dependencies.
 */
import Question from "../question";
import Answer from "../answer";
import { WlCard } from "../../blocks/wl-card";
import WlButton from "../wl-button";
import FaqEditButtonGroup from "../faq-edit-button-group";

class FaqList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <FaqEditButtonGroup />
        {this.props.faqItems.map(item => {
          return (
            <React.Fragment>
              <WlCard onClickHandler={ ()=> { console.log("card clicked")} }>
                <Question question={item.question} />
                <Answer answer={item.answer} />
              </WlCard>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  faqItems: state.faqItems
}))(FaqList);
