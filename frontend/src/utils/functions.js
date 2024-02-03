import moment from 'moment';
import 'moment/locale/sq';
import detectBrowserLanguage from 'detect-browser-language'


export function ToDateTime(value){
        const detectBrowserLanguage = require('detect-browser-language')

    return moment(value).locale(detectBrowserLanguage()).format('DD/MM/YYYY hh:mm:ss');
}

export function DateFromNow(value){
            const detectBrowserLanguage = require('detect-browser-language')
    return moment(value).locale(detectBrowserLanguage()).fromNow();
}

export async function ShareAPI(title, text, url){
    if (navigator.share === undefined) {
        console.log('Error: Unsupported feature: navigator.share');
        return;
      }
  
    //   const text = `Une po lexoj nga faqja Tech News. Lexo postimin nga linkun origjinal: ${props.post.title}`
  
      try {
        await navigator.share({title, text, url});
        console.log('Successfully sent share');
      } catch (error) {
        console.log('Error sharing: ' + error);
      }
}

export function isMobile(){
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}