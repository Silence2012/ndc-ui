import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    ButtonArea,
    Button,
    MediaBoxDescription,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
} from '../../packages';
import './menu.css';
import './statusqueryitem.css';
import Util from '../utils/Util';

import $ from 'jquery';
const baoxiuicon = <img src="/images/baoxiu-@2x.png" />
const fuwuicon = <img src="/images/fuwu@2x.png" />
const gongchengshiicon = <img src="/images/gongchengshi@2x.png" />
const shangmenicon = <img src="/images/shangmen@2x.png" />
const weixiuicon = <img src="/images/weixiu-@2x.png" />


class StatusQueryItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemId: '',
            reporttime: '',
            reportcomplete: '',
            servicecentertime: '',
            servicecentercomplete: '',
            engineertime: '',
            engineercomplete: '',
            engineercompleteimg: '',
            engineercompletetext: '',
            homeservicetime: '',
            homeservice: '',
            homeserviceimg: '',
            homeservicetext: '',
            completetime: '',
            statustext: '',
            engineercompleteimgshijian: '',
            homeserviceimgshijian: '',
            statusimg: '',
            statusimgshijian: '',
            statuscolor:'',
        };
    }

    detailsItemClick = () => {

        if (this.state.itemId) {
            const path = '/orderdetails/' + this.state.itemId + '/false';
            this.props.history.push(path);
        } else {

        }
    };


    componentDidMount() {
        // console.log(this.props.match.params.id);
        this.setState({
            itemId: this.props.match.params.id
        });
        let itemId = this.props.match.params.id;
        this.getStatusById(itemId);
    }

    getStatusById = (itemId) => {
        let url = process.env.REACT_APP_HTTP_PREFIX + "/repairs/status/" + itemId;
        var request = $.ajax({
            url: url,
            method: "GET",
            contentType: "application/json; charset=utf-8"
        });

        var self = this;

        request.done(function (msg) {
            if (msg) {
                const orderdetails = JSON.parse(msg);
                const orderlog = orderdetails.orderlog;
                // console.log(Util.timeStamp2String(orderlog.servicecenter.time))
                self.setState({
                    reporttime: Util.timeStamp2String(orderlog.report.time),
                    reportcomplete: orderlog.report.complete,
                    servicecentertime: Util.timeStamp2String(orderlog.servicecenter.time),
                    servicecentercomplete: orderlog.servicecenter.complete,
                    engineertime: Util.timeStamp2String(orderlog.engineer.time),
                    engineercomplete: orderlog.engineer.name !== '' ? true : false,
                    engineercompleteimg: orderlog.engineer.name !== '' ? <img src="/images/tijiai@2x.png" /> : <img src="/images/tijiaohuise@2x.png" />,
                    engineercompleteimgshijian: orderlog.engineer.name !== '' ? <img style={{ marginTop: '2px', width: '15px', float: 'left' }} src="/images/shijian@2x.png" /> : <img style={{ marginTop: '2px', width: '15px', float: 'left' }} src="/images/shijian---huise@2x.png" />,
                    engineercompletecolor: orderlog.engineer.name !== '' ? '#1887fc' : '',
                    engineercompletetext: orderlog.engineer.name !== '' ? '已提交' : '未提交',
                    homeservicetime: Util.timeStamp2String(orderlog.engineer.homeservicetime),
                    homeservice: orderlog.engineer.homeservice,
                    homeserviceimg: orderlog.engineer.homeservice ? <img src="/images/tijiai@2x.png" /> : <img src="/images/tijiaohuise@2x.png" />,
                    homeserviceimgshijian: orderlog.engineer.homeservice ? <img style={{ marginTop: '2px', width: '15px', float: 'left' }} src="/images/shijian@2x.png" /> : <img style={{ marginTop: '2px', width: '15px', float: 'left' }} src="/images/shijian---huise@2x.png" />,
                    homeservicecolor: orderlog.engineer.homeservice ? '#1887fc' : '',
                    homeservicetext: orderlog.engineer.homeservice ? '已提交' : '未提交',
                    status: orderdetails.status=='completed'?true:false,
                    statusimg: orderdetails.status=='completed'? <img src="/images/tijiai@2x.png" /> : <img src="/images/tijiaohuise@2x.png" />,
                    statusimgshijian: orderdetails.status=='completed'? <img style={{ marginTop: '2px', width: '15px', float: 'left' }} src="/images/shijian@2x.png" /> : <img style={{ marginTop: '2px', width: '15px', float: 'left' }} src="/images/shijian---huise@2x.png" />,
                    statuscolor: orderdetails.status=='completed'? '#1887fc' : '',
                    statustext: orderdetails.status=='completed'? '已提交' : '未提交',
                    //need change
                    completetime: Util.timeStamp2String(orderdetails.fixcompletedtime),
                });

            }

        });

        request.fail(function (jqXHR, textStatus) {
            self.setState({
                errorMsg: '出错了，请刷新重试，或者联系管理员'
            });
            alert('出错了，请刷新重试，或者联系管理员');
            console.log("Request failed: " + textStatus)
        });
    };



    render() {
        return (
            <div>
                <Cell className={'titlebar'}>
                    <CellHeader onClick={() => { window.history.go(-1) }} style={{ width: '20%', height: '65px', marginTop: '25px' }} >
                        <img style={{ float: 'left', height: '25px', marginTop: '8px' }} src='/images/jiantu@2x.png' />
                        <div className={'titlebarback'}>
                            返回
                 </div>
                    </CellHeader>

                    <CellBody style={{ textAlign: 'center' }} className={'titlebarcontent'}>
                        报修状态查询
                  </CellBody>
                    <CellFooter style={{ width: '20%' }} >
                        <img style={{ width: '30px',display:'none' }} src='/images/menu12@2x.png' />
                    </CellFooter>
                </Cell>
                {/* <img src='/images/touying@2x.png' /> */}
                <div className={'touying'}>
                    <img className={'dian'} src='/images/dian@2x.png' />
                    <div style={{ color: '#1887fc', }} className={'diancontent'}>您的报修单号</div>
                    <div style={{ color: 'lightgrey', }} className={'diancontentright'}>{this.state.itemId}</div>
                </div>
                <MediaBox key={1} type="appmsg" href="javascript:void(0);" >
                    <MediaBoxHeader>{baoxiuicon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>{'报修'}</MediaBoxTitle>
                        <div style={{ marginTop: '5px', }}>
                            <img style={{ marginTop: '2px', width: '15px', float: 'left' }} src='/images/shijian@2x.png' />
                            <div style={{ color: '#999999', fontSize: '13px', marginLeft: '22px' }}>
                                完成时间:{this.state.reporttime}
                            </div>
                        </div>
                    </MediaBoxBody>
                    <CellFooter><img src='/images/tijiai@2x.png' /></CellFooter>
                    <CellFooter style={{ color: '#1887fc' }}>已提交</CellFooter>
                </MediaBox>
                <MediaBox key={2} type="appmsg" href="javascript:void(0);" >
                    <MediaBoxHeader>{fuwuicon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>{'服务中心'}</MediaBoxTitle>
                        <div style={{ marginTop: '5px', }}>
                            <img style={{ marginTop: '2px', width: '15px', float: 'left' }} src='/images/shijian@2x.png' />
                            <div style={{ color: '#999999', fontSize: '13px', marginLeft: '22px' }}>
                                完成时间:{this.state.servicecentertime}
                            </div>
                        </div>
                    </MediaBoxBody>

                    <CellFooter><img src='/images/tijiai@2x.png' /></CellFooter>
                    <CellFooter style={{ color: '#1887fc' }}>已提交</CellFooter>
                </MediaBox>
                <MediaBox key={3} type="appmsg" href="javascript:void(0);" >
                    <MediaBoxHeader>{gongchengshiicon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>{'工程师'}</MediaBoxTitle>
                        <div style={{ marginTop: '5px', }}>
                            {this.state.engineercompleteimgshijian}
                            <div style={{ color: '#999999', fontSize: '13px', marginLeft: '22px' }}>
                                完成时间:{this.state.engineertime}
                            </div>
                        </div>
                    </MediaBoxBody>
                    <CellFooter>{this.state.engineercompleteimg}</CellFooter>
                    <CellFooter style={{ color: this.state.engineercompletecolor }}>{this.state.engineercompletetext}</CellFooter>
                </MediaBox>
                <MediaBox key={4} type="appmsg" href="javascript:void(0);" >
                    <MediaBoxHeader>{shangmenicon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>{'上门服务'}</MediaBoxTitle>
                        <div style={{ marginTop: '5px', }}>
                            {this.state.homeserviceimgshijian}
                            <div style={{ color: '#999999', fontSize: '13px', marginLeft: '22px' }}>
                                完成时间:{this.state.homeservicetime}
                            </div>
                        </div>
                    </MediaBoxBody>
                    <CellFooter>{this.state.homeserviceimg}</CellFooter>
                    <CellFooter style={{ color: this.state.homeservicecolor }}>{this.state.homeservicetext}</CellFooter>
                </MediaBox>
                <MediaBox key={5} type="appmsg" href="javascript:void(0);" >
                    <MediaBoxHeader>{weixiuicon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>{'维修完成'}</MediaBoxTitle>
                        <div style={{ marginTop: '5px', }}>
                            {this.state.statusimgshijian}
                            <div style={{ color: '#999999', fontSize: '13px', marginLeft: '22px' }}>
                                完成时间:{this.state.completetime}
                            </div>
                        </div>
                    </MediaBoxBody>
                    <CellFooter>{this.state.statusimg}</CellFooter>
                    <CellFooter style={{ color: this.state.statuscolor }}>{this.state.statustext}</CellFooter>
                </MediaBox>
                <ButtonArea>
                    <Button onClick={this.detailsItemClick.bind(this)}>
                        了解详情
                        </Button>
                </ButtonArea>
            </div>
        );
    }
}

export default withRouter(StatusQueryItem);

