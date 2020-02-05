import React from 'react';
import {Upload, Modal} from 'antd';

class UploadFiles extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
    };

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    render() {
        const {previewVisible, previewImage} = this.state;

        const {attachments} = this.props;

        return (
            <div className="clearfix">
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={attachments}
                    onPreview={this.handlePreview}
                >
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

export default UploadFiles;