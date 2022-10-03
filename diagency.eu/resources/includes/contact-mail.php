<?php

include "dbh.inc.php";
include "vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if(isset($_POST['contact-name']) && isset($_POST['contact-phone']) && isset($_POST['contact-email'])){
    $nume = $_POST['contact-name'];
    // $companie = $_POST['companie'];
    $telefon = $_POST['contact-phone'];
    $email = $_POST['contact-email'];
    // $website = $_POST['website'];
    $mesaj = $_POST['contact-message'];


    $subjectClient = "Mesajul tău a fost livrat cu succes!";
    $bodyClient = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="format-detection" content="date=no" />
            <meta name="format-detection" content="address=no" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="x-apple-disable-message-reformatting" />
    
        </head>
        <body class="body" style="padding: 0 !important;margin:0 ;!important;display:block !important; min-width: 100% !important; width:100% !important; background: #ec1c3c !important; -webkit-text-size-adjust:none;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ec1c3c">
                <tr>
                    <td align="center" style="padding: 15px 0px 15px;font-family:Arial, Helvetica, sans-serif;font-size: 90%;color:#ffffff">
                        <h3>We are di_agency!</h3>
                    </td>
                </tr>
                
                <tr>
    
                    <td align="center" style="padding: 0px 0px 20px 0px;">
                        <table  width="650" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                            <tr>
                                <td>
                                    <img src="cid:banner-top" alt="" width="100%">
                                </td>
                            </tr>
                            <tr>
                                <td style="font-family:Arial, Helvetica, sans-serif;font-size: 120%;padding: 0 20px;">
                                    <h2 style="text-align:center">Thank you for contacting us!</h2>
                                    <p style="padding:0 20px;text-align:center;">We have recived your message.</p>
                                    <p style="padding:0 20px;text-align:center;">We\'ll reach you out immediately!</p><br>
                                    
    
                                </td>
                            </tr>
                            <tr>
                                <td style="display:block;font-family:Arial, Helvetica, sans-serif;font-size: 120%;padding: 0 20px;" align="center">
                                    <a href="https://www.diagency.eu/" style="border-radius:50px;border:1px solid #ec1c3c;color:#ec1c3c;text-decoration: none;padding: 5px 15px;">back to homepage</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="cid:banner-bottom" width="100%" alt="">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0px 0px 20px 0px">
                                        <tr>
                                            <td style="font-family:Arial, Helvetica, sans-serif;font-size: 130%;padding: 0 20px;">
                                                <p style="padding:0 20px;text-align:center;">Let\'s connect!</p><br>
                                            </td>
                                        </tr>
                                        <tr>
                                        <td style="display:block" align="center">
                                        <a href="https://www.facebook.com/diclickmarketing" width="50px" style="display: inline-block;padding: 0px 10px 0px 10px;margin: 0 10px 0 10px;width:50px;" alt="">
                                            <img src="cid:icon-fb" alt="" width="50" style="width:50px;">
                                        </a>
                                        <a href="https://www.instagram.com/di_click_marketing/?utm_medium=copy_link" style="display: inline-block;padding: 0px 10px 0px 10px;margin: 0 10px 0 10px;width:50px;">
                                            <img src="cid:icon-insta" style="width:50px;" alt="" width="50">
                                        </a>
                                        <a href="https://www.linkedin.com/company/di-click" style="display: inline-block;padding: 0px 10px 0px 10px;margin: 0 10px 0 10px;width:50px;">
                                            <img src="cid:icon-linkd" alt="" width="50" style="width:50px;">
                                        </a>
                                    </td>
                                            
                                        </tr>
                                    </table>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
    
                </tr>
                    
                        
    
            </table>
    
    
    
    
        </body>
        </html>';

    $subject = "Avem un formular nou! - ".$nume;
    $body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="format-detection" content="date=no" />
            <meta name="format-detection" content="address=no" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="x-apple-disable-message-reformatting" />
    
        </head>
        <body class="body" style="padding: 0 !important;margin:0 ;!important;display:block !important; min-width: 100% !important; width:100% !important; background: #bd0023 !important; -webkit-text-size-adjust:none;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#bd0023">
                <tr>
                    <td align="center" style="padding: 15px 0px 15px;font-family:Arial, Helvetica, sans-serif;font-size: 90%;color:#ffffff">
                        <h3>Obtine clickurile care conteaza!</h3>
                    </td>
                </tr>
                
                <tr>
    
                    <td align="center" style="padding: 0px 0px 20px 0px;">
                        <table  width="650" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                            <tr>
                                <td>
                                    <img src="cid:banner-top" alt="" width="100%">
                                </td>
                            </tr>
                            <tr>
                                <td style="font-family:Arial, Helvetica, sans-serif;font-size: 120%;padding: 0 20px;">
                                    <h2 style="text-align:center">Avem un formular nou!</h2>
                                    <p style="padding:0 20px">Nume - '.$nume.'</p>
                                    
                                    <p style="padding:0 20px">Nr. de telefon - '.$telefon.'</p>
                                    <p style="padding:0 20px">Email - '.$email.'</p>
                                    
                                    <p style="padding:0 20px">'.$mesaj.'</p>
    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="cid:banner-bottom" width="100%" alt="">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0px 0px 20px 0px">
                                        <tr>
                                            <td style="display:block" align="center">
                                                <a href="https://www.facebook.com/diclickmarketing" width="50px" style="display: inline-block;padding: 0px 10px 0px 10px;margin: 0 10px 0 10px;width:50px;" alt="">
                                                    <img src="cid:icon-fb" alt="" width="50" style="width:50px;">
                                                </a>
                                                <a href="https://www.instagram.com/di_click_marketing/?utm_medium=copy_link" style="display: inline-block;padding: 0px 10px 0px 10px;margin: 0 10px 0 10px;width:50px;">
                                                    <img src="cid:icon-insta" style="width:50px;" alt="" width="50">
                                                </a>
                                                <a href="https://www.linkedin.com/company/di-click" style="display: inline-block;padding: 0px 10px 0px 10px;margin: 0 10px 0 10px;width:50px;">
                                                    <img src="cid:icon-linkd" alt="" width="50" style="width:50px;">
                                                </a>
                                            </td>
                                            
                                        </tr>
                                    </table>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
    
                </tr>
                    
                        
    
            </table>
    
    
    
    
        </body>
        </html>';
   
    $altBody = 'Nume - '.$nume.'\n  Companie - '.$companie.'\n   Nr. de telefon - '.$telefon.'\n   Email - '.$email.'\n Website - '.$website.'\n'.$mesaj;

    $mail = new PHPMailer(true);
    try{

        $mail -> SMTPDebug = 0;
        $mail -> isSMTP();
            $mail -> Host = 'mail.your-server.de';
            $mail -> SMTPAuth = true;
            $mail -> Username = 'sebastian@diagency.eu';
            $mail -> Password = 'Cb3I3Y6vuIqgH9vj';
            $mail -> SMTPSecure = 'TLS';
            $mail -> Port = 587;

        $mail -> setFrom($email,$nume);
        $mail -> addAddress("hello@diclick.eu");
        $mail -> addCC('dan@diagency.eu');


        $mail -> AddEmbeddedImage('banner-top-01.png','banner-top');
        $mail -> AddEmbeddedImage('banner-bottom-01.png','banner-bottom');
        $mail -> AddEmbeddedImage('icon-insta.png','icon-insta');
        $mail -> AddEmbeddedImage('icon-fb.png','icon-fb');
        $mail -> AddEmbeddedImage('icon-linkd.png','icon-linkd');


        $mail -> CharSet = 'UTF-8';
        $mail -> isHTML(true);
        $mail -> Subject = $subject;
        $mail -> Body = $body;
        $mail -> AltBody = $altBody;
 
        $mail -> send();
        echo '[{"status1":"success"},';
    } catch (Exception $e){
        echo '{"status1":"fail","error":"'.$mail->ErrorInfo.'"}]';
    }

    $mailClient = new PHPMailer(true);
    try{
        $mailClient -> SMTPDebug = 0;
        $mailClient -> isSMTP();
        $mailClient -> isSMTP();
        $mailClient -> Host = 'mail.your-server.de';
        $mailClient -> SMTPAuth = true;
        $mailClient -> Username = 'sebastian@diagency.eu';
        $mailClient -> Password = 'Cb3I3Y6vuIqgH9vj';
        $mailClient -> SMTPSecure = 'TLS';
        $mailClient -> Port = 587;


        $mailClient -> setFrom("hello@diclick.eu","di_click");
        $mailClient -> addAddress($email);

        $mailClient -> AddEmbeddedImage('banner-top-01.png','banner-top');
        $mailClient -> AddEmbeddedImage('banner-bottom-01.png','banner-bottom');
        $mailClient -> AddEmbeddedImage('icon-insta.png','icon-insta');
        $mailClient -> AddEmbeddedImage('icon-fb.png','icon-fb');
        $mailClient -> AddEmbeddedImage('icon-linkd.png','icon-linkd');

        $mailClient -> CharSet = 'UTF-8';
        $mailClient -> isHTML(true);
        $mailClient -> Subject = $subjectClient;
        $mailClient -> Body = $bodyClient;

        $mailClient -> send();
        echo '{"status2":"success"}]';
    } catch (Exception $e){
        echo '{"status2":"fail","error":"'.$mailClient->ErrorInfo.'"}]';
    }


}