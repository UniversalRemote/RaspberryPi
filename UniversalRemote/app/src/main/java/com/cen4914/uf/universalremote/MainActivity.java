package com.cen4914.uf.universalremote;


import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    /** Called when the user touches the button */
    public void clickOn(View view) {

    }

//    AsyncTask.execute(new Runnable() {
//        @Override
//        public void run() {
//            // All your networking logic
//            // should be here
//        }
//    });
}
