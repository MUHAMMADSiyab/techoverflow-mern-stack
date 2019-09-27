import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import TagsInput from "react-tagsinput";
import Prism from "prismjs";
import Alert from "../../alerts/Alert";
import Sidebar from "../partials/Sidebar";

// CSS
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-twilight.css";
import "react-tagsinput/react-tagsinput.css";

// Actions
import { askQuestion } from "../../../actions/question";

const AskQuestion = ({ askQuestion, history }) => {
  useEffect(() => {
    // initialize prism
    Prism.highlightAll();
  });

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: []
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { title, body, tags } = formData;

  const onSubmit = e => {
    e.preventDefault();

    askQuestion(formData, history);
  };

  const handleTagsChange = tags => setFormData({ ...formData, tags: tags });

  return (
    <div className="container-fluid main-container">
      <div className="row">
        <div className="col-sm-8">
          <h3 className="mt-5">Ask question</h3>
          <hr />
          <Alert />
          <form className="ask-question" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="e.g How to encrypt a string in C"
                value={title}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="body">Body</label>
              <Editor
                apiKey="nw38hznt2nhic1gj21u46vzizr34ry3dfc2t9fsn1e9rfe18"
                cloudChannel="dev"
                name="body"
                init={{
                  selector: "textarea", // change this value according to your HTML
                  plugins: "codesample",
                  toolbar: "codesample, bold, italic"
                }}
                content="Some initial content"
                initialValue={body}
                onChange={e => {
                  setFormData({ ...formData, body: e.target.getContent() });
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <TagsInput value={tags} onChange={e => handleTagsChange(e)} />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btn btn-blue"
                value="Ask question"
              />
            </div>
          </form>
        </div>
        <div className="col-sm-4">
          <Sidebar
            title="Instruction"
            items={[
              "Be Specific",
              "Do not use languages other than english",
              "Mention the code you've tried",
              "Do not ask already asked questions",
              "Give better explanation to get better help"
            ]}
          />
        </div>
      </div>
    </div>
  );
};

AskQuestion.propTypes = {
  askQuestion: PropTypes.func.isRequired
};

export default connect(
  null,
  { askQuestion }
)(withRouter(AskQuestion));
