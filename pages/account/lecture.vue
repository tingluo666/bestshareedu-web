<template>
  <div>
    <y-header></y-header>
    <div class="person_body container account_cont clearfix">
      <y-side :type="'wsjs'"></y-side>
      <div class="main_box">
        <ul class="tabs clearfix">
          <a class="tab on">教学意向</a>
        </ul>
        <div class="main_cont">
          <div class="main_cont form" v-if="isLogin">
						<form action="" @submit="doUpdateLecturerIntention">
							<div class="form_group">
								<div class="label">身份证号:</div>
								<div class="form_ctl">
									<input type="text" v-model="obj.idNumber" class="form_input" placeholder="请输入身份证号">
								</div>
							</div>
							<div class="form_group">
								<div class="label">身份证正面:</div>
								<div class="form_ctl upload_ctl">
									<input type="hidden" v-model="obj.positiveIdImgUrl">
									<div class="preview">
										<img :src="obj.positiveIdImgUrl" alt="" v-if="obj.positiveIdImgUrl">
										<i class="iconfont" v-else>&#xe6b2;</i>
									</div>
									<d-upload @rtnUrl="setUrlPositive"></d-upload>
								</div>
								<div class="label">身份证反面:</div>
								<div class="form_ctl upload_ctl">
									<input type="hidden" v-model="obj.negativeIdImgUrl">
									<div class="preview">
										<img :src="obj.negativeIdImgUrl" alt="" v-if="obj.negativeIdImgUrl">
										<i class="iconfont" v-else>&#xe6b2;</i>
									</div>
									<d-upload @rtnUrl="setUrlNegative"></d-upload>
								</div>
							</div>
							<div class="form_group">
								<div class="label">学历:</div>
								<div class="form_ctl">
									<select name="public-choice" v-model="obj.education">
											<option :value="education.id" v-for="education in educationList" >{{education.name}}</option>                                    
									</select>
								</div>
							</div>
							<div class="form_group">
								<div class="label">毕业学校:</div>
								<div class="form_ctl">
										<input type="text" v-model="obj.school" class="form_input" placeholder="请输入毕业学校">
								</div>
							</div>						
							<div class="form_group">
								<p class="tip">学位证、毕业证、学生证三者上传其一即可.</p>
								<div class="label">学位证:</div>
								<div class="form_ctl upload_ctl">
									<input type="hidden" v-model="obj.degreeImgUrl">
									<div class="preview">
										<img :src="obj.degreeImgUrl" alt="" v-if="obj.degreeImgUrl">
										<i class="iconfont" v-else>&#xe6b2;</i>
									</div>
									<d-upload @rtnUrl="setUrlDegree"></d-upload>
								</div>
								<div class="label">毕业证:</div>
								<div class="form_ctl upload_ctl">
									<input type="hidden" v-model="obj.diplomaImgUrl">
									<div class="preview">
										<img :src="obj.diplomaImgUrl" alt="" v-if="obj.diplomaImgUrl">
										<i class="iconfont" v-else>&#xe6b2;</i>
									</div>
									<d-upload @rtnUrl="setUrlDiploma"></d-upload>
								</div>
								<div class="label">学生证:</div>
								<div class="form_ctl upload_ctl">
									<input type="hidden" v-model="obj.studentImgUrl">
									<div class="preview">
										<img :src="obj.studentImgUrl" alt="" v-if="obj.studentImgUrl">
										<i class="iconfont" v-else>&#xe6b2;</i>
									</div>
									<d-upload @rtnUrl="setUrlStudent"></d-upload>
								</div>
							</div>							
							<div class="form_group">
								<div class="label">教师资格证编号:</div>
								<div class="form_ctl">
										<input type="text" v-model="obj.tqcNumber" class="form_input" placeholder="请输入教师资格证编号">
								</div>
							</div>
							<div class="form_group">
								<div class="label">教师资格证:</div>
								<div class="form_ctl upload_ctl">
									<input type="hidden" v-model="obj.tqcImgUrl">
									<div class="preview">
										<img :src="obj.tqcImgUrl" alt="" v-if="obj.tqcImgUrl">
										<i class="iconfont" v-else>&#xe6b2;</i>
									</div>
									<d-upload @rtnUrl="setUrlTqc"></d-upload>
								</div>
							</div>
							<div class="form_group">
								<div class="label">住址:</div>
								<div class="form_ctl">
									<div class="label">省:</div>
								</div>
								<div class="form_ctl">
								 <select name="public-choice" v-model="obj.provinceId" @change="provinceSelected">
										<option :value="province.provinceId" v-for="province in provinceList" >{{province.provinceName}}</option>                                    
									</select>
								</div>
								<div class="form_ctl">
										<div class="label">市:</div>
								</div>
								<div class="form_ctl">
									<select name="public-choice" v-model="obj.cityId" @change="citySelected">
										<option :value="city.cityId" v-for="city in cityList" >{{city.cityName}}</option>                                    
									</select>
								</div>
							</div>
							<div class="form_group">
								<div class="label">详细地址:</div>
								<div class="form_ctl">
									<input type="text" v-model="obj.address" class="form_input" placeholder="请输入详细地址">
								</div>
							</div>
							<div class="form_group">
								<div class="label">授课年级:</div>
									<!-- <tr>
											<td class = "checkbox" v-for="grade in gradeList">
												<input type="checkbox" :value="grade.value" v-model="grade.checked" />
												<label :for="grade.value">{{grade.value}}</label>
											</td>
									</tr> -->
							</div>
							<div class="form_group">
								<div class="label">授课学科:</div>
									<!-- <tr>
										<td class = "checkbox" v-for="subject in subjectList">
											<input type="checkbox" :value="subject.value" v-model="subject.checked" />
											<label :for="subject.value">{{subject.value}}</label>
										</td>
									</tr> -->
							</div>
							<div class="form_group">
								<div class="label">教学经验:</div>
								<textarea class="textarea" placeholder="请输入教学经验" maxlength="500" @input="expInput" v-model="obj.experience" />
								<span class="numberV">{{expVal}}/500</span>
								<p class="tip">供学员家长、工作人员参考；真实详尽叙述100字左右</p>
							</div>
							<div class="form_group">
								<div class="label">证书奖项:</div>
								<textarea class="textarea" placeholder="请输入证书奖项" maxlength="500" @input="awardInput" v-model="obj.award" />
								<span class="numberV">{{awardVal}}/500</span>
								<p class="tip">如:CET、学科竞赛、奖学金、计算机、口译、教学奖项等</p>
							</div>
							<div class="form_group">
								<div class="label">教学成果:</div>
								<textarea class="textarea" placeholder="请输入教学成果" maxlength="500" @input="achInput" v-model="obj.achievement" />
								<span class="numberV">{{achVal}}/500</span>
								<p class="tip">供学员家长、工作人员参考；真实详尽叙述100字左右</p>
							</div>
							<div class="form_group">
								<div class="label">&nbsp;</div>
								<div class="form_ctl">
									<button href="javascript:" class="submit_btn">保存</button>
								</div>
							</div>
						</form>
					</div>
					<div class="main_cont form" v-else>
						<div class="form_group">
							<div class="label">身份证号:</div>
							<div class="form_ctl">
								<div class="text">{{ obj.idNumber }}</div>
							</div>
						</div>
						<div class="form_group">
							<div class="label">身份证正面:</div>
							<div class="form_ctl upload_ctl">
								<input type="hidden" v-model="obj.positiveIdImgUrl">
								<div class="preview">
									<img :src="obj.positiveIdImgUrl" alt="" v-if="obj.positiveIdImgUrl">
									<i class="iconfont" v-else>&#xe6b2;</i>
								</div>
							</div>
							<div class="label">身份证反面:</div>
							<div class="form_ctl upload_ctl">
								<input type="hidden" v-model="obj.negativeIdImgUrl">
								<div class="preview">
									<img :src="obj.negativeIdImgUrl" alt="" v-if="obj.negativeIdImgUrl">
									<i class="iconfont" v-else>&#xe6b2;</i>
								</div>
							</div>
						</div>
						<div class="form_group">
							<div class="label">学历:</div>
							<div class="form_ctl">
								<div class="text">{{ obj.education }}</div>
							</div>
						</div>
						<div class="form_group">
							<div class="label">毕业学校:</div>
							<div class="form_ctl">
									<div class="text">{{ obj.school }}</div>
							</div>
						</div>
						<div class="form_group">
							<div class="label">学位证:</div>
							<div class="form_ctl upload_ctl">
								<input type="hidden" v-model="obj.degreeImgUrl">
								<div class="preview">
									<img :src="obj.degreeImgUrl" alt="" v-if="obj.degreeImgUrl">
									<i class="iconfont" v-else>&#xe6b2;</i>
								</div>
							</div>
							<div class="label">毕业证:</div>
							<div class="form_ctl upload_ctl">
								<input type="hidden" v-model="obj.diplomaImgUrl">
								<div class="preview">
									<img :src="obj.diplomaImgUrl" alt="" v-if="obj.diplomaImgUrl">
									<i class="iconfont" v-else>&#xe6b2;</i>
								</div>
							</div>
							<div class="label">学生证:</div>
							<div class="form_ctl upload_ctl">
								<input type="hidden" v-model="obj.studentImgUrl">
								<div class="preview">
									<img :src="obj.studentImgUrl" alt="" v-if="obj.studentImgUrl">
									<i class="iconfont" v-else>&#xe6b2;</i>
								</div>
							</div>
						</div>
						<div class="form_group">
							<div class="label">教师资格证编号:</div>
							<div class="form_ctl">
								<div class="text">{{ obj.tqcNumber }}</div>
							</div>
						</div>
						<div class="form_group">
							<div class="label">教师资格证:</div>
							<div class="form_ctl upload_ctl">
								<input type="hidden" v-model="obj.tqcImgUrl">
								<div class="preview">
									<img :src="obj.tqcImgUrl" alt="" v-if="obj.tqcImgUrl">
									<i class="iconfont" v-else>&#xe6b2;</i>
								</div>
							</div>
						</div>
						<div class="form_group">
								<div class="label">住址:</div>
								<div class="form_ctl">
									<div class="label">省:</div>
								</div>
								<div class="form_ctl">
									<div class="text">{{ obj.province }}</div>
								</div>
								<div class="form_ctl">
										<div class="label">市:</div>
								</div>
									<div class="form_ctl">
										<div class="text">{{ obj.city }}</div>
									</div>
						</div>
						<div class="form_group">
							<div class="label">详细地址:</div>
							<div class="form_ctl">
								<div class="text">{{ obj.address }}</div>
							</div>
						</div>
						<div class="form_group">
							<div class="label">授课年级:</div>
								<!-- <tr>
										<td class = "checkbox" v-for="grade in gradeList">
											<input type="checkbox" :value="grade.value" v-model="grade.checked" disabled="true"/>
											<label :for="grade.value">{{grade.value}}</label>
										</td>
								</tr> -->
						</div>
						<div class="form_group">
							<div class="label">授课学科:</div>
								<!-- <tr>
										<td class = "checkbox" v-for="subject in subjectList">
											<input type="checkbox" :value="subject.value" v-model="subject.checked" disabled="true"/>
											<label :for="subject.value">{{subject.value}}</label>
										</td>
								</tr> -->
						</div>
						<div class="form_group">
							<div class="label">教学经验:</div>
							<div class="text">{{ obj.experience }}</div>
						</div>
						<div class="form_group">
							<div class="label">证书奖项:</div>
								<div class="text">{{ obj.award }}</div>
						</div>
						<div class="form_group">
							<div class="label">教学成果:</div>
								<div class="text">{{ obj.achievement }}</div>
						</div>
						<div class="form_group">
							<div class="label">&nbsp;</div>
								<div class="form_ctl">
									<button href="javascript:" class="submit_btn" @click="editInfo">修改</button>
								</div>
						</div>
					</div>
				</div>
			</div>
    </div>
    <y-footer></y-footer>
  </div>
</template>
<script>
import YHeader from '~/components/common/Header'
import YFooter from '~/components/common/Footer'
import YSide from '~/components/account/Side'
import DUpload from '~/components/account/Upload'
import {getUserInfo,getLecturerIntention,getUserIntention,getProvinceList,getCityList} from '~/api/user.js'
import {updateUserEducationInf,updateLecturerIntention,updateUserIntention} from '~/api/account/user.js'
import { myHttp } from '~/utils/myhttp.js'
export default {
  data () {
    return {
      isLogin: false,
      region1: [],
      region2: [],
      errTip1: '',
      errTip2: '',
			expVal: '',
			awardVal: '',
			achVal: '',
			provinceId: '000000',
			cityId: '000000',
      obj: {
				id:'',
        idNumber: '',
				userNo: '',
				education: '',
				school: '',
        positiveIdImgUrl: '',
				negativeIdImgUrl: '',
				diplomaImgUrl:'',
				studentImgUrl:'',
				degreeImgUrl:'',
				tqcImgUrl:'',
				tqcNumber:'',
        experience: '',
        award: '',
				achievement: '',
        province: '',
        city: '',
				gradeList:[],
				subjectList:[]
      },
			educationList:[
				{
						id: '0',
						name: '----请选择学历----'
				},
				{
						id: '1',
						name: '大专'
				},
				{
						id: '2',
						name: '本科'
				},
				{
						id: '3',
						name: '硕士'
				},
				{
						id: '4',
						name: '博士'
				},
			],
      
			provinceList:[],
			cityList:[],
			gradeList:[
				{checked:false,value:'学前'},
				{checked:false,value:'小学'},
				{checked:false,value:'初中'},
				{checked:false,value:'高中'},
				{checked:false,value:'大学'},
				{checked:false,value:'成人'},
				{checked:false,value:'其他'}
			],
			subjectList:[
				{checked:false,value:'语文'},
				{checked:false,value:'数学'},
				{checked:false,value:'奥数自招'},
				{checked:false,value:'英语'},
				{checked:false,value:'化学'},
				{checked:false,value:'物理'},
				{checked:false,value:'生物'},
				{checked:false,value:'历史'},
				{checked:false,value:'地理'},
				{checked:false,value:'政治'},
				{checked:false,value:'音乐'},
				{checked:false,value:'美术'},
				{checked:false,value:'计算机'},
				{checked:false,value:'托福'},
				{checked:false,value:'雅思'},
				{checked:false,value:'艺术'},
				{checked:false,value:'其他'}
			]
    }
  },
  methods: {
    getByUser () {
      myHttp.call(this, {
        method: getLecturerIntention
      }).then(res => {
        console.log(res)
        this.obj = res.data || {}
      }).catch(error => {})
    },
    editInfo () {
      this.isLogin = true;
    },
    doUpdateLecturerIntention (e) {
			console.log('doUpdateLecturerIntention')
      e.preventDefault();
      // if (!this.obj.nickname) {
      //   this.errTip1 = '请输入昵称';
      //   return false;
      // } else {
      //   this.errTip1 = false;
      // }
      // this.id = this.obj.id;
      console.log(this.obj)
      myHttp.call(this, {
        method: updateLecturerIntention,
        params: this.obj,
        confirm: () => {window.location.reload()},
        cancel: () => {window.location.reload()}
      }).then(res => {
        console.log(res)
        this.$store.commit('SET_USER', res.data)
        this.$msgBox({
          content: '修改成功',
          isShowCancelBtn: false
        }).then(async (val) => {
          window.location.reload()
        }).catch(() => {
          window.location.reload()
        })
      })
    },
		getProvinceList(){
			
			myHttp.call(this, {
				method: getProvinceList,
				params: {"level":1}
			}).then(res => {
				console.log(res)
				this.provinceList = res.data.regionList
			})
		},
		provinceSelected(e){
			console.log(e)
			console.log(this.obj.provinceId)
			if(this.obj.provinceId != '000000'){
					myHttp.call(this, {
						method: getCityList,
						params: {"provinceId":this.obj.provinceId,"level":2}
					}).then(res => {
						console.log(res)
						this.cityList = res.data.regionList
				})
			}
		},
		citySelected(e){
			console.log(e)
			console.log(this.obj.cityId)
			if(this.obj.cityId != '000000'){
					myHttp.call(this, {
						method: getCityList,
						params: {"cityId":this.obj.cityId,"level":2}
					}).then(res => {
						console.log(res)
						this.cityList = res.data.regionList
				})
			}
		},
		expInput(){
        this.expVal = this.obj.experience.length;
    },
		awardInput(){
        this.awardVal = this.obj.award.length;
    },
		achInput(){
        this.achVal = this.obj.achievement.length;
    },
    setUrlPositive (res) {
			console.log(res)
      this.obj.positiveIdImgUrl = res.url;
    },
		setUrlNegative(res) {
			console.log(res)
      this.obj.negativeIdImgUrl = res.url;
    },
		setUrlDegree(res) {
			console.log(res)
      this.obj.degreeImgUrl = res.url;
    },
		setUrlDiploma(res) {
			console.log(res)
      this.obj.diplomaImgUrl = res.url;
    },
		setUrlStudent(res) {
			console.log(res)
      this.obj.studentImgUrl = res.url;
    },
		setUrlTqc(res) {
			console.log(res)
      this.obj.tqcImgUrl = res.url;
    }
  },
  mounted () {
    this.getByUser()
		this.getProvinceList()
  },
  components: {
    YHeader,
    YFooter,
    YSide,
    DUpload
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~/assets/css/account.scss';
  .upload_ctl{
    .preview{
      width: 100px;
      height: 100px;
      background-color: #f5f5f5;
      text-align: center;
      margin-bottom: 10px;
      i{
        line-height: 120px;
        font-size: 80px;
        color: #ddd;
      }
    }
  }
	
	.checkbox{
		line-height: 36px;
		float: left;
		margin-left: 4px;
	}
	.textarea{
		width:400px;
		height: 200px;
	}
	select{
		width: 120px;
		margin-top: 8px;
	}
	
</style>