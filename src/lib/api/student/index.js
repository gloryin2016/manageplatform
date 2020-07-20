import request from '@lib/request'

// 获取学校信息
function GetSchoolInfo() {
  return request.get('/manageplatform/school/info').then((result) => {
    return result.data
  })
}

// 获取教师列表
function GetStudentList({ keyword, start, rows }) {
  return request
    .get('/manageplatform/student/list', {
      params: {
        keyword,
        start,
        rows,
      },
    })
    .then((result) => {
      return result.data
    })
}

export default {
  GetSchoolInfo,
  GetStudentList,
}
