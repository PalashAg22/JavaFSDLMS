package com.hexaware.lms.service;

import java.io.ByteArrayOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hexaware.lms.dto.LoanApplicationDTO;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

//	public void sendSimpleEmail(String toEmail, String subject, String body) {
//		SimpleMailMessage message = new SimpleMailMessage();
//		message.setFrom("coursera.ag02@gmail.com");
//		message.setTo(toEmail);
//		message.setText(body);
//		message.setSubject(subject);
//		mailSender.send(message);
//		System.out.println("Mail Send...");
//
//	}
	public void sendMailWithAttachment(String toEmail,String name,LoanApplicationDTO loanDto, String address, long loanID,MultipartFile file) throws MessagingException {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);
        
        DeviceRgb bgColor = new DeviceRgb(200, 200, 200);
        DeviceRgb borderColor = new DeviceRgb(64, 64, 64);
        
        Paragraph paragraph = new Paragraph().setBackgroundColor(bgColor).setBorder(new SolidBorder(borderColor, 2));
        
        paragraph.add(new Paragraph("Welcome to Loan Management System"+"\n").setBold().setFontSize(16).setTextAlignment(TextAlignment.CENTER));
        paragraph.add("\n");
        paragraph.add(new Paragraph("Successfully applied for Loan Application").setBold().setFontSize(16).setTextAlignment(TextAlignment.CENTER));
        paragraph.add("\n\n");
        paragraph.add(new Paragraph("Customer Name : ").setBold().setFontSize(14));
        paragraph.add(new Paragraph(name+"\n").setFontSize(14));
        paragraph.add("\n");
        
        paragraph.add(new Paragraph("Customer ID : ").setBold().setFontSize(14));
        paragraph.add(new Paragraph(loanDto.getCustomerId()+"\n").setFontSize(14));
        paragraph.add("\n");
        
        paragraph.add(new Paragraph("Loan Application ID : ").setBold().setFontSize(14));
        paragraph.add(new Paragraph(loanID+"\n").setFontSize(14));
        paragraph.add("\n");
        
        paragraph.add(new Paragraph("Loan Type : ").setBold().setFontSize(14));
        paragraph.add(new Paragraph(loanDto.getLoanTypeName()+"\n").setFontSize(14));
        paragraph.add("\n");
        
        paragraph.add(new Paragraph("Loan Ammount : ").setBold().setFontSize(14));
        paragraph.add(new Paragraph(loanDto.getPrincipal()+"\n").setFontSize(14));
        paragraph.add("\n");
        
        paragraph.add(new Paragraph("Loan Duration : ").setBold().setFontSize(14));
        paragraph.add(new Paragraph(loanDto.getTenureInMonths()+"\n"));
        paragraph.add(new Paragraph("\n"));
        
        paragraph.add(new Paragraph("Property Information submitted \n").setBold().setFontSize(14).setTextAlignment(TextAlignment.CENTER));
        paragraph.add("\n");
        paragraph.add(new Paragraph("Property Address : ").setBold().setFontSize(14));
        paragraph.add("\n");
        paragraph.add(new Paragraph(address+"\n").setFontSize(14));
        paragraph.add("\n");
        
        document.add(paragraph);
        document.close();
        
        byte[] pdfBytes = baos.toByteArray();
        
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        
        mimeMessageHelper.setFrom("coursera.ag02@gmail.com");
        mimeMessageHelper.setTo(toEmail);
        mimeMessageHelper.setSubject("Successfully applied for loan application!");
        mimeMessageHelper.setText("Thankyou for applying Loan");
        mimeMessageHelper.addAttachment("LoanApplicationForm.pdf", new ByteArrayDataSource(pdfBytes, "application/pdf"));
        mimeMessageHelper.addAttachment("SubmittedDocuments.pdf", file);
        mailSender.send(mimeMessage);
        System.out.println("Mail with attachment sent...");
        
	}
	
	public void updatedStatus(String toEmail, String name, String status, long loanId) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("coursera.ag02@gmail.com");
		message.setTo(toEmail);
		message.setText("Updated status for your loan application having id : "+loanId +"\n"+
				"Updated Status : "+status);
		message.setSubject("Updated Loan Application Status");
		mailSender.send(message);
		System.out.println("Mail Send...");
	}
}
