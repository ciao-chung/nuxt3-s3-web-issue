export default {
  'keep.login': '保持登入狀態',
  'keep.login.help': '請勿在公共電腦使用此功能',
  'remember.email': '記住我的Email',
  'remember.email.help': '下次登入不需重新輸入Email',

  // module
  'module.otp': 'OTP',
  'module.file': '檔案管理',

  // validator
  'validate.error.required': '此欄位為必填',
  'validate.error.whitespace': '不可使用空白',
  'validate.error.invalid_char': '不可使用字元 {string}',
  'validate.error.email_incorrect': 'Email格式不正確',
  'validate.error.text_too_less': '字數最少{length}字',
  'validate.error.password_format_incorrect': '必須至少4個字元',
  'validate.error.password_not_match': '密碼不一致',
  'validate.error.phone_number_incorrect': '手機號碼格式不正確',
  'validate.error.old_password_cannot_be_used': '此密碼在最近三次重設紀錄中被使用，請使用其他密碼',
  'validate.error.password.too_weak': '密碼強度不足',

  // data
  'otp.data.code': '驗證碼',
  'otp.data.target': 'Email或手機號碼',
  'otp.data.ttl': '有效時間',
  'otp.data.feature': '用途',
  'otp.data.feature.admin-reset-password': '管理員重設密碼',
  'otp.data.feature.member-register': '會員註冊',
  'otp.data.feature.member-reset-password': '會員重設密碼',
  'file.data.filename': '檔案名稱',
  'file.data.category': '用途標籤',
  'file.data.extension': '副檔名',
  'file.search_keyword': '輸入檔名搜尋',

  // notify
  'login_success': '登入成功',

  // file
  'file.size': '檔案大小',
  'file.action.upload': '上傳檔案',
  'file.help.max_size_limit': '檔案大小不可超過{max}MB',
  'file.help.max_quantity_limit': '最多{quantity}個檔案',
  'file.upload.success': '檔案上傳成功',
  'file.upload.success.content': '共{quantity}個檔案',
  'file.upload.fail': '檔案上傳失敗',
  'file.warning.max_size_limit': '檔案大小超過限制',

  // warning
  'warning.token_invalid': '登入憑證失效',
  'warning.token_invalid.message': '請重新進行登入',

  // error
  'error.recaptcha_verify_fail': 'Recaptcha驗證失敗',
  'error.login_fail': '登入失敗',
  'error.oauth_login_fail': '{provider} 登入失敗',
  'error.oauth_login_fail.message': '請重試或使用其他方式登入',
  'error.login_fail.reason.wrong_email_or_password': 'Email或密碼錯誤',
  'error.login_fail.reason.account_not_exist': '{email} 非管理員帳號',
  'error.login_fail.reason.locked': '此帳號為黑名單無法登入',
  'error.login_fail.reason.too_frequent': '短時間登入失敗次數太多, 請於{lock_login_until}再嘗試登入',
  'error.reset_password_fail.reason.password_used': '此密碼在最近被使用，請使用其他密碼',

  // action
  'action.login': '登入',

  // others
  'otp.search_keyword': '輸入驗證碼、Email、手機號碼搜尋',
  'file_manager': '檔案管理',
  'oauth.provider.google': 'Google',
  'oauth.provider.line': 'Line',
}