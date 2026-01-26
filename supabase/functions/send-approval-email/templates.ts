/**
 * Email Templates for Supabase Edge Function
 * HTML and plain text email templates
 */

export interface EmailTemplateData {
  username: string
  email: string
  companyName?: string
  rejectedReason?: string
  loginUrl?: string
}

/**
 * Approval Email Template
 */
export function getApprovalEmailTemplate(data: EmailTemplateData): {
  subject: string
  text: string
  html: string
} {
  const { username, companyName, loginUrl = 'https://marvelring.com/login' } = data

  const subject = '[Marvelring] 회원 가입이 승인되었습니다'

  const text = `
안녕하세요 ${username}님,

축하합니다! Marvelring 회원 가입이 승인되었습니다.

${companyName ? `소속: ${companyName}\n` : ''}
이제 로그인하여 보석 컬렉션을 탐색하고 주문하실 수 있습니다.

로그인 링크: ${loginUrl}

궁금하신 사항이 있으시면 고객센터로 문의해주세요.
고객센터: support@marvelring.com
전화: 02-1234-5678

감사합니다.
Marvelring 드림
  `.trim()

  const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>회원 가입 승인</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Marvelring</h1>
  </div>

  <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">

    <h2 style="color: #667eea; margin-top: 0;">회원 가입이 승인되었습니다</h2>

    <p>안녕하세요 <strong>${username}</strong>님,</p>

    <p>축하합니다! Marvelring 회원 가입이 승인되었습니다.</p>

    ${companyName ? `<p style="background: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0;">
      <strong>소속:</strong> ${companyName}
    </p>` : ''}

    <p>이제 로그인하여 다양한 보석 컬렉션을 탐색하고 주문하실 수 있습니다.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${loginUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">로그인하기</a>
    </div>

    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

    <div style="color: #666; font-size: 14px;">
      <p><strong>고객센터</strong></p>
      <p>
        이메일: <a href="mailto:support@marvelring.com" style="color: #667eea;">support@marvelring.com</a><br>
        전화: 02-1234-5678<br>
        운영시간: 평일 09:00 - 18:00
      </p>
    </div>

  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>본 메일은 발신 전용입니다. 문의사항은 고객센터를 이용해주세요.</p>
    <p>&copy; 2026 Marvelring. All rights reserved.</p>
  </div>

</body>
</html>
  `.trim()

  return { subject, text, html }
}

/**
 * Rejection Email Template
 */
export function getRejectionEmailTemplate(data: EmailTemplateData): {
  subject: string
  text: string
  html: string
} {
  const { username, rejectedReason } = data

  const subject = '[Marvelring] 회원 가입 심사 결과 안내'

  const text = `
안녕하세요 ${username}님,

Marvelring에 관심을 가져주셔서 감사합니다.

신중한 검토 끝에 현재 회원 가입을 승인하기 어려운 상황입니다.

${rejectedReason ? `거절 사유: ${rejectedReason}\n` : ''}

추가 문의사항이 있으시거나 재신청을 원하시는 경우,
고객센터로 연락 주시기 바랍니다.

고객센터: support@marvelring.com
전화: 02-1234-5678

감사합니다.
Marvelring 드림
  `.trim()

  const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>회원 가입 심사 결과</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Marvelring</h1>
  </div>

  <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">

    <h2 style="color: #666; margin-top: 0;">회원 가입 심사 결과 안내</h2>

    <p>안녕하세요 <strong>${username}</strong>님,</p>

    <p>Marvelring에 관심을 가져주셔서 감사합니다.</p>

    <p>신중한 검토 끝에 현재 회원 가입을 승인하기 어려운 상황입니다.</p>

    ${rejectedReason ? `<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
      <p style="margin: 0;"><strong>거절 사유:</strong></p>
      <p style="margin: 10px 0 0 0;">${rejectedReason}</p>
    </div>` : ''}

    <p>추가 문의사항이 있으시거나 재신청을 원하시는 경우, 고객센터로 연락 주시기 바랍니다.</p>

    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

    <div style="color: #666; font-size: 14px;">
      <p><strong>고객센터</strong></p>
      <p>
        이메일: <a href="mailto:support@marvelring.com" style="color: #667eea;">support@marvelring.com</a><br>
        전화: 02-1234-5678<br>
        운영시간: 평일 09:00 - 18:00
      </p>
    </div>

  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>본 메일은 발신 전용입니다. 문의사항은 고객센터를 이용해주세요.</p>
    <p>&copy; 2026 Marvelring. All rights reserved.</p>
  </div>

</body>
</html>
  `.trim()

  return { subject, text, html }
}

/**
 * Get appropriate email template based on approval status
 */
export function getEmailTemplateByStatus(
  status: 'APPROVED' | 'REJECTED',
  data: EmailTemplateData
): { subject: string; text: string; html: string } {
  if (status === 'APPROVED') {
    return getApprovalEmailTemplate(data)
  } else if (status === 'REJECTED') {
    return getRejectionEmailTemplate(data)
  } else {
    throw new Error(`Invalid approval status: ${status}`)
  }
}
