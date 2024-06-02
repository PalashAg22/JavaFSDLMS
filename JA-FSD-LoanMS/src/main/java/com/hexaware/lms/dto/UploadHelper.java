package com.hexaware.lms.dto;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UploadHelper {
	
	static Logger logger = LoggerFactory.getLogger(UploadHelper.class);
	
	public static byte[] compressImage(byte[] data) {
		logger.info("Compressing File...");
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        while (!deflater.finished()) {
            int size = deflater.deflate(tmp);
            outputStream.write(tmp, 0, size);
        }
        try {
            outputStream.close();
        } catch (Exception ignored) {
        	ignored.printStackTrace();
        }
        return outputStream.toByteArray();
    }
	public static byte[] decompressImage(byte[] data) {
	    Inflater inflater = new Inflater();
	    inflater.setInput(data);
	    ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
	    byte[] tmp = new byte[4*1024];
	    try {
	        while (!inflater.finished()) {
	            int count = inflater.inflate(tmp);
	            outputStream.write(tmp, 0, count);
	        }
	        outputStream.close();
	    } catch (DataFormatException | IOException e) {
	        e.printStackTrace();
	    } finally {
	        inflater.end();
	    }
	    return outputStream.toByteArray();
	}

}
