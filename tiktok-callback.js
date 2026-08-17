const LOCAL_CALLBACK = 'http://localhost:3000/api/tiktok/callback';
const source = new URLSearchParams(window.location.search);
const target = new URL(LOCAL_CALLBACK);
const state = source.get('state') || '';
const code = source.get('code') || '';
const error = source.get('error') || '';
const errorDescription = source.get('error_description') || '';
const status = document.querySelector('#callbackStatus');
const continueLink = document.querySelector('#continueLink');

history.replaceState(null, '', window.location.pathname);

if (!/^[a-f0-9]{48}$/i.test(state) || (!code && !error)) {
  status.textContent = '유효한 TikTok 인증 응답이 아닙니다. Content AutoPilot에서 연결을 다시 시작하세요.';
} else {
  target.searchParams.set('state', state);
  if (code) target.searchParams.set('code', code.slice(0, 2048));
  if (error) target.searchParams.set('error', error.slice(0, 200));
  if (errorDescription) target.searchParams.set('error_description', errorDescription.slice(0, 500));
  continueLink.href = target.href;
  continueLink.hidden = false;
  status.textContent = '로컬 Content AutoPilot으로 이동합니다. 앱이 실행 중이어야 합니다.';
  window.location.replace(target.href);
}
