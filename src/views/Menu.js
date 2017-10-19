import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle
} from '../../packages';
import './menu.css';
import $ from 'jquery';

const repairsubmiticon = <img src="/images/baoxiu-@2x.png" />
const statusqueryicon = <img src="/images/cahxun@2x.png" />
const repairmanagementicon = <img src="/images/guanli-@2x.png" />

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {
      let url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=hDftRWKxW-Oxf0q5OBnzlGEK2SrCL3uJ73GQuggJ4XZS1ap3-n6-D3FCcKgXQ0nGjaDbu8uj0N3gnCrButAlmVO9vXihHe8ZSDmSYWxKX9DAZ2Z4Xbwrb5Kn7_h6bMovZFLcAHAIOU&openid=OPENID&lang=zh_CN';

      $.getJSON(url + "&jsoncallback=?",function(json){

         alert('getjson function: ' +json)
      });

      var request = $.ajax({
        url: url,
        method: "GET",
        contentType: "application/json; charset=utf-8"
      });

      var self = this;

      request.done(function (msg) {
        alert(msg)
      });

      request.fail(function (jqXHR, textStatus) {
        alert('获取用户信息失败')
        alert(jqXHR);
        alert(textStatus)
        return;
      });
    }

    menuItemClick = (pageId) => {
        let path = '/';
        if (pageId === '1') {
            path = '/repairsubmit';
        }
        if (pageId === '2') {
            path = '/statusquery';
        }
        if (pageId === '3') {
            path = '/repairmanagement';
        }

        this.props.history.push(path);
    };

    closePage = () => {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
            window.location.href = "about:blank";
        } else if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
            window.opener = null; window.open('about:blank', '_self', '').close();
        } else {
            window.opener = null;
            window.open("about:blank", "_self");
            window.close();
        }


    }

    render() {
        return (
            <div>
                <Cell className={'titlebar'}>
                    <CellHeader onClick={this.closePage.bind(this)} style={{width:'20%', height: '65px', marginTop: '25px' }} >
                        <img style={{ float: 'left', height: '25px', marginTop: '8px' }} src='/images/jiantu@2x.png' />
                        <div className={'titlebarback'}>
                            返回
                     </div>
                    </CellHeader>

                    <CellBody style={{ textAlign: 'center' }} className={'titlebarcontent'}>
                        NDC在线报修
                  </CellBody>
                    <CellFooter style={{ width: '20%' }} >
                        <img style={{ width: '30px',display:'none' }} src='/images/menu12@2x.png' />
                    </CellFooter>
                </Cell>

                <MediaBox key={1} type="appmsg" href="javascript:void(0);" onClick={this.menuItemClick.bind(this, '1')}>
                    <MediaBoxHeader>{repairsubmiticon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>{'我要报修'}</MediaBoxTitle>
                    </MediaBoxBody>
                </MediaBox>
                <MediaBox key={2} type="appmsg" href="javascript:void(0);" onClick={this.menuItemClick.bind(this, '2')}>
                    <MediaBoxHeader>{statusqueryicon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>{'状态查询'}</MediaBoxTitle>

                    </MediaBoxBody>
                </MediaBox>
                <MediaBox key={3} type="appmsg" href="javascript:void(0);" onClick={this.menuItemClick.bind(this, '3')}>
                    <MediaBoxHeader>{repairmanagementicon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>{'报修管理'}</MediaBoxTitle>
                    </MediaBoxBody>
                </MediaBox>
            </div>
        );
    }
}

export default withRouter(Menu);

