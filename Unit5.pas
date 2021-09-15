unit Unit5;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs,
  FMX.Controls.Presentation, FMX.StdCtrls;

type
  TForm5 = class(TForm)
    Label1: TLabel;
    OK: TCornerButton;
    Anuluj: TCornerButton;
    procedure OKClick(Sender: TObject);
    procedure AnulujClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form5: TForm5;

implementation

{$R *.fmx}

uses Unit3;

procedure TForm5.AnulujClick(Sender: TObject);
begin
//Unit.dysp:=false
end;

procedure TForm5.OKClick(Sender: TObject);
begin
//Unit3.dysp:=true;
end;

end.
