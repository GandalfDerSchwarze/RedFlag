package org.client;

import lombok.extern.slf4j.Slf4j;

import java.io.*;

@Slf4j
public class Input {
    private static InputStream is = System.in;
    private static BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(is));

    public static String readString(){
        if (System.in != is) {
            is = System.in;
            bufferedReader = new BufferedReader(new InputStreamReader(is));
        }
        try {
            return bufferedReader.readLine();
        } catch (IOException e) {
            log.error("This should not have happened - Carl is on it", e);
            return "CAAAARRRLLLL it is not working";
        }
    }
}